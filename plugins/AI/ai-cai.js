import { ApiGratis } from '../../lib/ai/api-gratis.js';
import chalk from 'chalk';

let handler = async (m, { conn, command, text }) => {
    conn.externalIds = conn.externalIds || {};
    if (!text) return m.reply(`Input query. Example: .cai hello\nUsage:\n.caiinfo <external_id> - Get character info by external ID.\n.caisearch <query> - Search character by query.\n.caistats - Get status.\n.cai <message> - Send message using saved external ID.\n.caiset <external_id> - Set external ID for .cai command.`.trim());

    const apiClient = new ApiGratis();

    try {
        let message = '';
        message = command === 'caiinfo' ? (await apiClient.getCharacterInfo(text)).result.character ? formatCharacterInfo((await apiClient.getCharacterInfo(text)).result.character) : 'Character info not found.' : 
                  command === 'caistats' ? (await apiClient.getStatus()).result.status === 'ok' ? formatStatus((await apiClient.getStatus()).result) : 'Character info not found.' :
                  command === 'cai' ? conn.externalIds[m.chat] ? ((await apiClient.sendMessage(conn.externalIds[m.chat], text)).result.replies[0]?.text ?? 'No reply from AI.') : 'No external ID set. Use .caiset command to set external ID. ❗' :
                  command === 'caisearch' ? (await apiClient.searchCharacters(text)).result.characters ? formatSearchResults((await apiClient.searchCharacters(text)).result.characters) : 'Character info not found.' :
                  command === 'caiset' ? (!text ? m.reply(`Please provide an external ID to set. Example: .caiset your_external_id`) : (conn.externalIds[m.chat] = text.trim(), `External ID set successfully! ✅`)) :
                  'Invalid command. ❌';

        await m.reply(message || 'Not found');
    } catch (error) {
        console.error(chalk.red('Error:', error.message));
        await m.reply(`Error: ${error.message} ❌`);
    }
}

handler.help = ["cai", "caiinfo", "caistats", "caiset", "caisearch"];
handler.tags = ["ai"];
handler.command = /^(cai|caiinfo|caistats|caiset|caisearch)$/i;

export default handler;

function formatCharacterInfo(character) {
    const { title, name, visibility, greeting, avatar_file_name, participant__num_interactions, user__username, priority, search_score } = character;
    return `*Title:* ${title}\n*Name:* ${name}\n*Visibility:* ${visibility}\n*Greeting:* ${greeting}\n*Avatar:* ${avatar_file_name}\n*Participant Interactions:* ${participant__num_interactions}\n*User Username:* ${user__username}\n*Priority:* ${priority}\n*Search Score:* ${search_score}`;
}

function formatStatus(status) {
    const { version, cai_status } = status;
    const isAuthenticated = cai_status.is_authenticated ? 'Yes' : 'No';
    const isBrowserLaunched = cai_status.browser_launched ? 'Yes' : 'No';
    return `*Status:* OK\n*Version:* ${version}\n*Authenticated:* ${isAuthenticated}\n*Browser Launched:* ${isBrowserLaunched}`;
}

function formatSearchResults(characters) {
    return characters.map((char, index) => `*${index + 1}.* ${char.title}\n   *Name:* ${char.participant__name}\n   *ExternalID:* ${char.external_id}\n   *Greeting:* ${char.greeting}\n   *Visibility:* ${char.visibility}\n   *Participant Interactions:* ${char.participant__num_interactions}\n   *User Username:* ${char.user__username}\n   *Priority:* ${char.priority}\n   *Search Score:* ${char.search_score}`).join('\n\n');
}
