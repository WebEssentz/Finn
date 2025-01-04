// types/hume.ts
export interface HumeResponse {
  id: string;
  version: number;
  version_type: string;
  name: string;
  created_on: number;
  modified_on: number;
  text: string;
}

export interface CodeGenerationRequest {
  prompt_id: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
  metadata: {
    timestamp: string;
    user: string;
  };
}