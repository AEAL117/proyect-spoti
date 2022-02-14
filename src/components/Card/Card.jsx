import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function MediaControlCard({name, artist, image, url}) {
  const theme = useTheme();

  return (
    <a style={{ textDecoration: 'none',color:'black' }} href={url}>
    <Card sx={{ 
        display: "flex",
        justifyContent: "space-between",
        maxHeight: 150,
        cursor: "pointer",
    }}
    >
      <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column' 
          }}
      >
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="body1">
            {name}
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            component="div"
            >
            {artist}
          </Typography>
        </CardContent>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            pl: 1, 
            pb: 1 
            }}
        >
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        width={150}
        height={150}
        sx={{ width: 151 }}
        image={image}
        alt="Live from space album cover"
      />
    </Card>
    </a>
  );
}