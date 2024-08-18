import Airtable from "airtable";

const db = new Airtable({
  apiKey:
    import.meta.env.VITE_AIRTABLE_API_KEY ||
    "patt8BMQaR3mdd51g.30998629456a9412c40eb6096047edd7d1064d18131fbae408ab4c36f883f74d",
}).base(import.meta.env.VITE_AIRTABLE_BASE_ID || "appObMxyii8mzxK35");

export default db;
