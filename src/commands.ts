import 'dotenv/config';
import { InstallGlobalCommands } from './utils/discord.utils';

// Simple test command
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
};

// Command containing options
const CHALLENGE_COMMAND = {
  name: 'challenge',
  description: 'Challenge to a match of rock paper scissors',
  options: [
    {
      type: 3,
      name: 'object',
      description: 'Pick your object',
      required: true,
      choices: [],
    },
  ],
  type: 1,
};

const GEMINI_COMMAND = {
    name: 'gemini',
    description: 'Generate text with GPT-3',
    options: [
      {
        type: 3,
        name: 'prompt',
        description: 'Prompt for the AI',
        required: true,
      },
    ],
    type: 1,
};

const ALL_COMMANDS = [TEST_COMMAND, CHALLENGE_COMMAND, GEMINI_COMMAND];

const InstallCommands = () => InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
export default InstallCommands;