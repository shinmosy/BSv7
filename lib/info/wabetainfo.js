import cheerio from 'cheerio';
import axios from 'axios';

class WABetaInfo {
  async fetchPage(url) {
    try {
      const { data } = await axios.get(url);
      return cheerio.load(data);
    } catch (error) {
      throw new Error(`Error fetching page: ${error.message}`);
    }
  }

  extractArticleData(el) {
    const title = $('.entry-title a', el).text().trim();
    const date = new Date($('.published', el).attr('datetime')).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const category = $('.entry-categories a', el).map((_, cat) => $(cat).text().trim().toUpperCase()).get();
    const excerpt = $('.entry-excerpt', el).text().trim();
    const readMoreLink = $('.entry-read-more', el).attr('href');

    return { title, date, category, excerpt, readMoreLink };
  }

  async home() {
    try {
      const $ = await this.fetchPage('https://wabetainfo.com');
      return $('article[id^="post-"]').map((_, el) => this.extractArticleData(el)).get().filter(article => Object.values(article).every(value => value));
    } catch (error) {
      console.error('Error fetching home page:', error);
      return [];
    }
  }

  async read(url) {
    try {
      const $ = await this.fetchPage(url);
      $('.quads-location, .sharedaddy, .channel_card, style').remove();
      return $('article[id^="post-"]').map((_, el) => {
        const articleData = this.extractArticleData(el);
        const reactions = $('.wpra-reactions-container .wpra-reaction', el).map((_, el) => ({ name: ['Thumbs Up', 'Heart', 'Laughing', 'Surprised', 'Angry', 'Sad'][$(el).index()], count: parseInt($(el).attr('data-count'), 10) })).get();
        const questions = $('.kenta-article-content table tbody tr', el).map((_, el) => ({ question: $('td:first-child', el).text().trim(), answer: $('td:last-child', el).text().trim() })).get();
        const image = $('.image-container img').map((_, img) => $(img).attr('src')).get();
        const recents = $('#recent-posts-2 ul li a').map((_, el) => ({ title: $(el).text().trim(), link: $(el).attr('href') })).get();
        return { ...articleData, reactions, questions, image, recents };
      }).get();
    } catch (error) {
      console.error('Error fetching article:', error);
      return [];
    }
  }

  async search(q) {
    try {
      const $ = await this.fetchPage(`https://wabetainfo.com/?s=${encodeURIComponent(q)}`);
      return $('article[id^="post-"]').map((_, el) => this.extractArticleData(el)).get().filter(article => Object.values(article).every(value => value));
    } catch (error) {
      console.error('Error fetching search results:', error);
      return [];
    }
  }
}

export { WABetaInfo };
