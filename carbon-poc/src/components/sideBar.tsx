import { useState, useEffect, useRef } from 'react';
import { Paper, InputBase, IconButton, Box, List, ListItem, ListItemButton, ListItemText, CircularProgress, Collapse } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type SearchResult = {
  display_name: string;
  lat: string;
  lon: string;
  importance?: number;
  address?: { country_code?: string };
};

type SidebarProps = {
  onSearch: (lat: string, lon: string, display_name: string) => void;
};

export function Sidebar({ onSearch }: SidebarProps) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce query input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch search results when debouncedQuery changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            debouncedQuery
          )}&limit=15&countrycodes=nz&addressdetails=1&extratags=1`
        );
        const data: SearchResult[] = await response.json();
        const nzResults = data.filter(item => item.address?.country_code === 'nz');
        const scored = nzResults
          .map(item => ({ ...item, score: getScore(item, debouncedQuery) }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 8); // top 8 results
        setResults(scored);
        setHighlightIndex(0);
      } catch (err) {
        console.error('Search failed', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  // Simple fuzzy scoring
  const getScore = (item: SearchResult, q: string) => {
    const text = item.display_name.toLowerCase();
    const queryLower = q.toLowerCase();
    let score = 0;
    if (text === queryLower) score = 100;
    else if (text.startsWith(queryLower)) score = 90;
    else if (text.includes(queryLower)) score = 70;
    score += item.importance ? item.importance * 10 : 0;
    return score;
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Handle selection of a result
  const handleSelect = (result: SearchResult) => {
    onSearch(result.lat, result.lon, result.display_name);
    setResults([]);
    setQuery(result.display_name);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;
    if (e.key === 'ArrowDown') {
      setHighlightIndex(prev => (prev + 1) % results.length);
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setHighlightIndex(prev => (prev - 1 + results.length) % results.length);
      e.preventDefault();
    } else if (e.key === 'Enter') {
      handleSelect(results[highlightIndex]);
      e.preventDefault();
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          zIndex: 1000,
          width: '300px',
          height: '100vh',
          backgroundColor: 'white',
          color:'black',
          padding: 2,
          boxShadow: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.15)' },
          }}
        >
          <InputBase
            inputRef={inputRef}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search locations in New Zealand..."
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            )}
          </Box>
        </Paper>

        <Collapse in={results.length > 0} timeout={200}>
          <List sx={{ maxHeight: '300px', overflow: 'auto', bgcolor: 'background.paper' }}>
            {results.map((result, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  opacity: 0,
                  animation: `fadeInUp 0.3s ease forwards`,
                  animationDelay: `${index * 0.05}s`,
                  backgroundColor: index === highlightIndex ? 'rgba(25,118,210,0.1)' : 'transparent',
                }}
              >
                <ListItemButton onClick={() => handleSelect(result)}>
                  <ListItemText
                    primary={result.display_name}
                    primaryTypographyProps={{
                      style: { whiteSpace: 'normal', wordBreak: 'break-word', fontSize: '0.9rem' },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Box>
    </>
  );
}
