import { countryName } from "../helpers";

export type Article = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type ApiResponse = { articles: Article[] };

export type ApiError = { code: string; message: string };

export type UrlParams = {
  country: keyof typeof countryName;
  category: string;
};
