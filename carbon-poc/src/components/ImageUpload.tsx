import { useState, useRef } from 'react';
import { Box, Typography, Button, Card, CardContent, IconButton, Paper, CircularProgress, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const apiKey = import.meta.env.VITE_API_KEY;

const API_ENDPOINT = 'https://your-api-host.example/predict';


export function ImageUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      addFiles(newFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
    setFiles(prev => [...prev, ...imageFiles]);
    
    // Create preview URLs
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    
    if (event.dataTransfer.files) {
      const newFiles = Array.from(event.dataTransfer.files);
      addFiles(newFiles);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleAnalyze = async () => {
    if (files.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const formData = new FormData();
      
      // Add all files to FormData
      files.forEach((file) => {
        formData.append('file', file);
      });
      console.log(files)
      console.log(formData)
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'X-API-Key': apiKey,
          'ngrok-skip-browser-warning': 'true'
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      setAnalysisResult(result);
      console.log('Analysis result:', result);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze images';
      setError(errorMessage);
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Box sx={{ 
      height: '100vh', 
      width: '100%', 
      p: 4, 
      backgroundColor: '#f5f5f5',
      overflowY: 'auto'
    }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'success.main', fontWeight: 'bold' }}>
        Upload Land Images for Assessment
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Upload photos of your land to receive an AI-powered carbon credit assessment. 
        We analyze vegetation coverage, terrain, land use patterns, and water features.
      </Typography>

      {/* Drop Zone */}
      <Paper
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        sx={{
          mt: 3,
          p: 6,
          textAlign: 'center',
          cursor: 'pointer',
          border: isDragging ? '3px dashed' : '2px dashed',
          borderColor: isDragging ? 'success.main' : 'grey.400',
          backgroundColor: isDragging ? 'success.light' : 'background.paper',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'success.main',
            backgroundColor: 'success.light',
            opacity: 0.9
          }
        }}
      >
        <CloudUploadIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {isDragging ? 'Drop images here' : 'Drag & drop images here'}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          or click to browse your files
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Supports: JPG, PNG, HEIC, WebP
        </Typography>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mt: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Success/Results Alert */}
      {analysisResult && (
        <Card sx={{ mt: 3, backgroundColor: analysisResult.prediction === 1 ? '#e8f5e9' : '#fff3e0' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <CheckCircleIcon 
                sx={{ 
                  fontSize: 48, 
                  color: analysisResult.prediction === 1 ? 'success.main' : 'warning.main' 
                }} 
              />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {analysisResult.prediction === 1 ? '✅ ELIGIBLE' : '❌ INELIGIBLE'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Carbon Credit Assessment Complete
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>Assessment Details</Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p: 2, backgroundColor: 'white', borderRadius: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Confidence Level
                </Typography>
                <Typography variant="h6" color="success.main">
                  {(analysisResult.confidence * 100).toFixed(2)}%
                </Typography>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Probability Breakdown:</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1.5, backgroundColor: 'white', borderRadius: 1 }}>
                    <Typography variant="body2">❌ Ineligible Probability</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {(analysisResult.probabilities[0] * 100).toFixed(4)}%
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1.5, backgroundColor: 'white', borderRadius: 1 }}>
                    <Typography variant="body2">✅ Eligible Probability</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {(analysisResult.probabilities[1] * 100).toFixed(4)}%
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Button 
                variant="outlined" 
                sx={{ mt: 3 }} 
                onClick={() => setAnalysisResult(null)}
              >
                Close Results
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Preview Grid */}
      {files.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              <ImageIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Selected Images ({files.length})
            </Typography>
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={isAnalyzing ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <CheckCircleIcon />}
              onClick={handleAnalyze}
              disabled={files.length === 0 || isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Images'}
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {previews.map((preview, index) => (
              <Box key={index} sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.33% - 11px)', lg: 'calc(25% - 12px)' } }}>
                <Card sx={{ position: 'relative' }}>
                  <CardContent sx={{ p: 0 }}>
                    <Box
                      component="img"
                      src={preview}
                      alt={files[index].name}
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover'
                      }}
                    />
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFile(index);
                      }}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        '&:hover': {
                          backgroundColor: 'error.main',
                          color: 'white'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Box sx={{ p: 1 }}>
                      <Typography variant="caption" noWrap>
                        {files[index].name}
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary">
                        {(files[index].size / 1024 / 1024).toFixed(2)} MB
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Info Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.33% - 16px)' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main" gutterBottom>
                📸 High Quality Photos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upload clear, well-lit images of your land from multiple angles for best results.
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.33% - 16px)' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main" gutterBottom>
                🌳 Vegetation Coverage
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our AI identifies trees, forests, and green spaces to estimate carbon sequestration.
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33.33% - 16px)' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="success.main" gutterBottom>
                📊 Instant Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Receive detailed assessment results including estimated carbon credits in tCO₂.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
