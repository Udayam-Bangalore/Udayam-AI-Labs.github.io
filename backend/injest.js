import { RAGSystem } from "./RAG";

const runIngestion = async () => {
    try {
        console.log("Initializing RAG system for data ingestion...");
        const ragSystem = new RAGSystem();

        console.log("Starting data ingestion from './document.txt'...");
        await ragSystem.ingestData('./document.txt');
        
        console.log("Data ingestion completed successfully!");
        console.log("Your Supabase vector store is now ready.");

    } catch (error) {
        console.error("Failed to ingest data:", error);
        process.exit(1); 
    }
};

runIngestion();