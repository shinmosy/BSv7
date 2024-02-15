import { didyoumean3 } from 'didyoumean3';

const randomEmojis = ['🤔', '😊', '🤩', '😜', '🧐', '😅'];

const getRandomEmoji = () => randomEmojis[Math.floor(Math.random() * randomEmojis.length)];

export async function before(m, { match, usedPrefix }) {
  try {
    if ((usedPrefix = (match[0] || '')[0])) {
      const noPrefix = m.text.replace(usedPrefix, '').trim().toLowerCase();

      const helpPromises = Object.values(plugins)
        .filter(v => v.help && !v.disabled)
        .map(async v => v.help.map(entry => entry.trim().split(' ')[0].toLowerCase()))

      const help = await Promise.all(helpPromises).then(arrays => arrays.flat());

      const { winner, matched } = didyoumean3(noPrefix, help);

      if (winner !== noPrefix) {
        const filteredMatches = matched.filter(item => item.score < 4);

        const groupedByScore = filteredMatches.reduce((acc, item) => {
          const score = 10 - item.score;
          const target = item.target.trim();
          const scoreKey = Math.max(1, Math.min(10, score));

          acc[scoreKey] = acc[scoreKey] ? [...acc[scoreKey], target] : [target];
          return acc;
        }, {});

        const resultText = Object.entries(groupedByScore)
  .sort(([scoreA], [scoreB]) => scoreB - scoreA)
  .slice(0, 4)
  .filter(([score, suggestions]) => score.trim() && suggestions.length > 0)
  .map(([score, suggestions], index) => {
    const adjustedScore = Math.max(1, Math.min(10, 10 - parseInt(score)));
    const scoreString = `${adjustedScore}`;
    const formattedSuggestions = suggestions.slice(0, 4).map(suggestion => `   - ${usedPrefix + suggestion}`).join('\n');
    return `*${index + 1}.* Similarity: *${parseInt(Number(10 - scoreString))}/10*\n${formattedSuggestions}`;
  })
  .join('\n\n');

        if (resultText) {
          const mentionedJid = m.mentionedJid?.[0] ?? (m.fromMe ? this.user.jid : m.sender);
          const senderName = (await this.getName(mentionedJid)).split('\n')[0];

          await this.sendMessage(m.chat, {
            text: `👋 Hai ${senderName} @${mentionedJid.split('@')[0]} !\n*Apakah maksudmu:* ${getRandomEmoji()}\n${resultText}`,
            mentions: [mentionedJid]
          }, {
            quoted: m
          });
        }
      }
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
  }
}

export const disabled = false;
