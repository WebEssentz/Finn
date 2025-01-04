// src/db/schema.ts
import { 
  pgTable, 
  serial, 
  varchar, 
  timestamp, 
  json, 
  integer, 
  boolean,
  text
} from "drizzle-orm/pg-core";

// Users table for authentication and profile management
export const Users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull().unique(),
  imageUrl: varchar('image_url'),
  githubId: varchar('github_id').unique(),  // For GitHub OAuth
  vsCodeIntegrationToken: varchar('vscode_token'),  // For VS Code connection
  voicePreferences: json('voice_preferences'),  // Store voice settings
  activeSubscription: boolean('active_subscription').default(false),
  stripeCustomerId: varchar('stripe_customer_id'),
  subscriptionTier: varchar('subscription_tier'),  // 'free', 'pro', 'enterprise'
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Development Sessions (Calls)
export const Calls = pgTable('calls', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => Users.id),
  projectContext: json('project_context'),  // Store project analysis data
  vsCodeState: json('vscode_state'),  // VS Code editor state
  status: varchar('status').notNull(),  // 'active', 'paused', 'completed'
  duration: integer('duration'),  // Session duration in seconds
  startedAt: timestamp('started_at').notNull().defaultNow(),
  endedAt: timestamp('ended_at'),
  lastActive: timestamp('last_active').notNull().defaultNow(),
});

// Checkpoints within calls
export const Checkpoints = pgTable('checkpoints', {
  id: serial('id').primaryKey(),
  callId: integer('call_id').references(() => Calls.id),
  name: varchar('name').notNull(),
  codeState: json('code_state'),  // Code state at checkpoint
  projectState: json('project_state'),  // Project state at checkpoint
  aiContext: json('ai_context'),  // AI's understanding at checkpoint
  createdAt: timestamp('created_at').notNull().defaultNow(),
  metadata: json('metadata'),  // Additional checkpoint data
});

// Code Analysis Results
export const CodeAnalysis = pgTable('code_analysis', {
  id: serial('id').primaryKey(),
  callId: integer('call_id').references(() => Calls.id),
  fileUrl: varchar('file_url').notNull(),
  language: varchar('language').notNull(),
  analysisType: varchar('analysis_type').notNull(),  // 'bugs', 'security', 'performance'
  results: json('results').notNull(),
  suggestions: json('suggestions'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Project Architecture Plans
export const ArchitecturePlans = pgTable('architecture_plans', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => Users.id),
  projectType: varchar('project_type').notNull(),  // 'system', 'database', 'api', 'fullstack'
  requirements: json('requirements').notNull(),
  constraints: json('constraints'),
  diagram: text('diagram'),  // Store architecture diagrams
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Debug Sessions
export const DebugSessions = pgTable('debug_sessions', {
  id: serial('id').primaryKey(),
  callId: integer('call_id').references(() => Calls.id),
  errorMessage: text('error_message').notNull(),
  stackTrace: text('stack_trace'),
  solution: json('solution'),
  status: varchar('status').notNull(),  // 'active', 'resolved', 'pending'
  createdAt: timestamp('created_at').notNull().defaultNow(),
  resolvedAt: timestamp('resolved_at'),
});

// Generated Code Snippets
export const CodeSnippets = pgTable('code_snippets', {
  id: serial('id').primaryKey(),
  callId: integer('call_id').references(() => Calls.id),
  language: varchar('language').notNull(),
  code: text('code').notNull(),
  description: text('description'),
  tags: varchar('tags').array(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Generate Device Sessions
export const TrialSessions = pgTable('trial_sessions', {
  id: serial('id').primaryKey(),
  deviceId: varchar('device_id').notNull().unique(),
  messageCount: integer('message_count').notNull().default(0),
  isExpired: boolean('is_expired').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// Type exports for TypeScript
export type User = typeof Users.$inferSelect;
export type Call = typeof Calls.$inferSelect;
export type Checkpoint = typeof Checkpoints.$inferSelect;
export type CodeAnalysis = typeof CodeAnalysis.$inferSelect;
export type ArchitecturePlan = typeof ArchitecturePlans.$inferSelect;
export type DebugSession = typeof DebugSessions.$inferSelect;
export type CodeSnippet = typeof CodeSnippets.$inferSelect;
export type TrailSessions = typeof TrialSessions.$inferSelect;