import cheerio from 'cheerio';
import axios from 'axios';

class WABetaInfo {
  async home() {
    try {
      const { data } = await axios.get('https://wabetainfo.com');
      const $ = cheerio.load(data);
      return $('article[id^="post-"]').map((_, el) => {
        const title = $('.entry-title a', el).text().trim();
        const date = new Date($('.published.updated', el).attr('datetime')).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const category = $('.entry-categories a', el).map((_, cat) => $(cat).text().trim().toUpperCase()).get();
        const excerpt = $('.entry-excerpt', el).text().trim();
        const readMoreLink = $('.entry-read-more', el).attr('href');
        
        return { title, date, category, excerpt, readMoreLink };
      }).get().filter(article => Object.values(article).every(value => value !== undefined && value !== ''));
    } catch (error) {
      console.error('Error fetching home page:', error);
      return [];
    }
  }

  async read(url) {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      $('.quads-location, .sharedaddy, .channel_card, style').remove();
      
      return $('article[id^="post-"]').map((_, el) => {
        const category = $(el).attr('class').match(/category-(\w+)/i)?.[1]?.toUpperCase() || '';
        const date = new Date($('.entry-date time', el).attr('datetime')).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const article = $('.kenta-article-content', el).clone().find('.wpra-reactions-container, table').remove().end().text().trim().replace(/\n+/g, '\n');
        const reactions = $('.wpra-reactions-container .wpra-reaction', el).map((_, el) => ({
          name: ['Thumbs Up', 'Heart', 'Laughing', 'Surprised', 'Angry', 'Sad'][$(el).index()],
          count: parseInt($(el).attr('data-count'), 10)
        })).get();
        const questions = $('.kenta-article-content table tbody tr', el).map((_, el) => ({
          question: $('td:first-child', el).text().trim(),
          answer: $('td:last-child', el).text().trim(),
        })).get();
        
        return { category, date, article, reactions, questions };
      }).get();
    } catch (error) {
      console.error('Error fetching article:', error);
      return [];
    }
  }

  async search(q) {
    try {
      const { data } = await axios.get(`https://wabetainfo.com/?s=${encodeURIComponent(q)}`);
      const $ = cheerio.load(data);
      return $('article[id^="post-"]').map((_, el) => {
        const title = $('.entry-title a', el).text().trim();
        const date = new Date($('.published', el).attr('datetime')).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const category = $('.entry-categories a', el).map((_, cat) => $(cat).text().trim().toUpperCase()).get();
        const excerpt = $('.entry-excerpt', el).text().trim();
        const readMoreLink = $('.entry-read-more', el).attr('href');
        
        return { title, date, category, excerpt, readMoreLink };
      }).get().filter(article => Object.values(article).every(value => value !== undefined && value !== ''));
    } catch (error) {
      console.error('Error fetching search results:', error);
      return [];
    }
  }
}

export { WABetaInfo };
