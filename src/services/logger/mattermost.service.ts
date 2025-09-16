import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class MattermostService {
    /**
     * Sends an error message to Mattermost
     *
     * @param message - The error message
     * @param trace - Stack trace (optional)
     * @param context - Error context (optional)
     * @param meta - Additional metadata (optional)
     */
    async sendError(message: string, trace?: string, context?: string, meta: any = {}) {
        if (!process.env.MATTERMOST_WEBHOOK_URL) {
            throw new Error('Mattermost webhook URL is not configured');
        }

        const payload = {
            text: '### :warning: Error Report\n' +
                `**Error:** ${message}\n` +
                (context ? `**Context:** ${context}\n` : '') +
                (trace ? `**Stack Trace:**\n\`\`\`\n${trace}\n\`\`\`\n` : '') +
                (Object.keys(meta).length > 0 ? `**Additional Info:**\n\`\`\`json\n${JSON.stringify(meta, null, 2)}\n\`\`\`\n` : '')
        };

        try {
            const response = await fetch(process.env.MATTERMOST_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Failed to send message to Mattermost: ${response.statusText}`);
            }
        } catch (error) {
            // Log the error locally since we couldn't send it to Mattermost
            console.error('Failed to send error to Mattermost:', error);
            throw error;
        }
    }
}
