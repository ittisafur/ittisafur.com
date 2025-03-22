export const fetchPortfolioForSitemap = async () => {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?populate=*`);

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
    return [];
  }
};

