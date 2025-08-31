// RAG.js

import { config } from 'dotenv';
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { createClient } from '@supabase/supabase-js';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import path from 'path';

config();

class RAGSystem {
    constructor() {
        this.llm = new ChatGoogleGenerativeAI({
            model: "gemini-1.5-flash-latest",
            apiKey: process.env.GOOGLE_API_KEY,
            temperature: 0.2,
        });

        this.embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GOOGLE_API_KEY,
            model: "text-embedding-004",
        });

        this.supabaseClient = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY
        );

        this.textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        this.vectorStore = null;
        this.retriever = null;
        this.chain = null;
    }

    async ingestData(filePath) {
        // ... (This method remains the same as your original code)
        try {
            console.log('Starting data ingestion...');
            const documents = await this.loadData(filePath);
            console.log(`Loaded ${documents.length} documents`);
            const chunks = await this.textSplitter.splitDocuments(documents);
            console.log(`Split into ${chunks.length} chunks`);
            await this.storeInVectorDatabase(chunks);
            console.log('Data ingestion completed successfully!');
        } catch (error) {
            console.error('Error during ingestion:', error);
            throw error;
        }
    }
    
    async loadData(filePath) {
        // ... (This method remains the same as your original code)
        const extension = path.extname(filePath).toLowerCase();
        let loader;
        switch (extension) {
            case '.pdf':
                loader = new PDFLoader(filePath);
                break;
            case '.txt':
                loader = new TextLoader(filePath);
                break;
            default:
                throw new Error(`Unsupported file type: ${extension}`);
        }
        return await loader.load();
    }
    
    async storeInVectorDatabase(chunks) {
        // ... (This method remains the same as your original code)
         try {
            this.vectorStore = await SupabaseVectorStore.fromDocuments(
                chunks,
                this.embeddings,
                {
                    client: this.supabaseClient,
                    tableName: 'documents',
                    queryName: 'match_documents',
                }
            );
            this.retriever = this.vectorStore.asRetriever({ k: 3 });
            console.log('Documents stored in vector database');
        } catch (error) {
            console.error('Error storing in vector database:', error);
            throw error;
        }
    }

    // ✨ This method is updated to create a history-aware chain
    async initializeQueryChain() {
        if (!this.retriever) {
            console.log('Retriever not found. Initializing from existing Supabase store.');
            this.vectorStore = new SupabaseVectorStore(this.embeddings, {
                client: this.supabaseClient,
                tableName: 'documents',
                queryName: 'match_documents',
            });
            this.retriever = this.vectorStore.asRetriever({ k: 3 });
        }

        // 1. Prompt for rephrasing the question based on history
        const historyAwarePrompt = ChatPromptTemplate.fromMessages([
            new MessagesPlaceholder("chat_history"),
            ["user", "{input}"],
            ["user", "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation"],
        ]);

        // 2. Create a retriever that considers the chat history
        const historyAwareRetrieverChain = await createHistoryAwareRetriever({
            llm: this.llm,
            retriever: this.retriever,
            rephrasePrompt: historyAwarePrompt,
        });

        // 3. Prompt for answering the question using the retrieved context
        const historyAwareAnswerPrompt = ChatPromptTemplate.fromMessages([
            ["system", "Answer the user's questions based on the below context:\n\n{context}"],
            new MessagesPlaceholder("chat_history"),
            ["user", "{input}"],
        ]);
        
        // 4. Chain to combine retrieved documents into the prompt
        const combineDocsChain = await createStuffDocumentsChain({
            llm: this.llm,
            prompt: historyAwareAnswerPrompt,
        });

        // 5. The final retrieval chain
        this.chain = await createRetrievalChain({
            retriever: historyAwareRetrieverChain,
            combineDocsChain,
        });
   
        console.log('History-aware query chain initialized');
    }

    async query(question, chat_history = []) {
        try {
            console.log(`Processing question: ${question}`);
            if (!this.chain) {
                await this.initializeQueryChain();
            }

            const result = await this.chain.invoke({
                chat_history,
                input: question,
            });

            const response = {
                answer: result.answer,
                sources: result.context.map(doc => ({
                    content: doc.pageContent.substring(0, 200) + '...',
                    metadata: doc.metadata
                })),
                retrievedDocs: result.context.length
            };
            
            console.log('Query processed successfully');
            return response;

        } catch (error) {
            console.error('Error during query:', error);
            throw error;
        }
    }
}

export { RAGSystem };