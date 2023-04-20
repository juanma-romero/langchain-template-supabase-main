import { serve } from "http/server.ts"; //The serve() function creates a new HTTP server that listens on the given address and port.
import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";

import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate, 
} from "langchain/prompts";

import { corsHeaders } from "../_shared/cors.ts";

const prompt = ChatPromptTemplate.fromPromptMessages([
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);
  
  serve(async (req) => { 
    // This is needed if you're planning to invoke your function from a browser.
    if (req.method === "OPTIONS") {  //The OPTIONS method is used to describe the communication options for the target resource.
      return new Response("ok", { headers: corsHeaders }); //corsHeaders is a variable that contains the headers needed for cross-origin resource sharing.
    }
  
    try {
      const { input } = await req.json();
  
       
        // For a non-streaming response we can just await the result of the
        // chain.run() call and return it.
        const llm = new ChatOpenAI();
        const chain = new LLMChain({ prompt, llm });
        const response = await chain.call({ input });
  
        return new Response(JSON.stringify(response), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  });