export const locationQueryApi = search_term =>
  `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${search_term}`;
