import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import NatureIcon from '@mui/icons-material/Nature';
import { useState, useRef } from 'react';
import { EImageType } from 'image-conversion';
import * as imageConversion from 'image-conversion';

export function CarbonPortfolioCard() {
  const [file, setFile] = useState<File[]>([]);
  const [isDrag, setIsDrag] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const originalFile = Array.from(event.target.files);
      const compressedFiles = await Promise.all(
        originalFile.map(file => compressImage(file))
      );
      setFile(compressedFiles);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const originalFile = Array.from(event.dataTransfer.files);
      const compressedFiles = await Promise.all(
        originalFile.map(file => compressImage(file))
      );
      setFile(compressedFiles);
      setIsDrag(false);
    }
  };

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDrag(true);
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDrag(false);
  }

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const renderImage = (file: File) => {
    const url = URL.createObjectURL(file);
    console.log('Compressed Image:', file);
    return <img src={url} alt={file.name} style={{ maxWidth: '100%', maxHeight: '200px' }} />;
  }

  const compressImage = async (file: File): Promise<File> => {
    const compressedBlob = await imageConversion.compressAccurately(file, { size: 128, type: EImageType.JPEG });
    return new File([compressedBlob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' });
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <PhotoLibraryIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
        <Typography variant="h5" component="h2" gutterBottom>
          My Assessments
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Track your land assessments:
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">• Images Uploaded: 0</Typography>
          <Typography variant="body1">• Assessments Complete: 0</Typography>
          <Typography variant="body1">• Estimated Credits: 0 tCO₂</Typography>
          <Typography variant="body1">• Land Area Analyzed: 0 ha</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Chip label="Upload Your First Image" variant="outlined" color="success" size="small" />
        </Box>
      </CardContent>
    </Card>
  );
}
