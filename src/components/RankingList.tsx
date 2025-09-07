import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Typography,
  Chip,
  Avatar,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  EmojiEvents,
  Favorite,
  Token,
  TrendingUp,
  YouTube,
  Instagram
} from '@mui/icons-material';

type RankingPeriod = 'daily' | 'weekly' | 'monthly' | 'allTime';
type ContentType = 'all' | 'dance' | 'art' | 'music';

interface CreatorStats {
  rank: number;
  wallet: string;
  nickname: string;
  profileImage: string;
  cheers: number;
  rewards: number;
  badges: Array<{
    name: string;
    type: 'achievement' | 'rank' | 'special'
  }>;
  growthRate: number;
  contentCount: number;
  socialLinks: {
    youtube?: string;
    instagram?: string;
  };
}

const RankingList = () => {
  const [period, setPeriod] = useState<RankingPeriod>('weekly');
  const [contentType, setContentType] = useState<ContentType>('all');

  const mockData: CreatorStats[] = [
    {
      rank: 1,
      wallet: '0x1234...5678',
      nickname: 'K-Dance Pro',
      profileImage: '/avatars/1.jpg',
      cheers: 15000,
      rewards: 500,
      badges: [
        { name: '주간 챔피언', type: 'rank' },
        { name: '라이징 스타', type: 'achievement' }
      ],
      growthRate: 25,
      contentCount: 42,
      socialLinks: {
        youtube: 'https://youtube.com/@kdancepro',
        instagram: '@kdancepro'
      }
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" fontWeight="bold">
          크리에이터 랭킹
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small">
            <InputLabel>기간</InputLabel>
            <Select
              value={period}
              label="기간"
              onChange={(e) => setPeriod(e.target.value as RankingPeriod)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="daily">일간</MenuItem>
              <MenuItem value="weekly">주간</MenuItem>
              <MenuItem value="monthly">월간</MenuItem>
              <MenuItem value="allTime">전체</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>콘텐츠 종류</InputLabel>
            <Select
              value={contentType}
              label="콘텐츠 종류"
              onChange={(e) => setContentType(e.target.value as ContentType)}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="all">전체</MenuItem>
              <MenuItem value="dance">댄스</MenuItem>
              <MenuItem value="art">팬아트</MenuItem>
              <MenuItem value="music">커버곡</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>순위</TableCell>
              <TableCell>크리에이터</TableCell>
              <TableCell align="center">응원수</TableCell>
              <TableCell align="center">보상</TableCell>
              <TableCell>뱃지</TableCell>
              <TableCell align="center">성장률</TableCell>
              <TableCell>SNS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData.map((creator) => (
              <TableRow key={creator.wallet} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {creator.rank <= 3 && (
                      <EmojiEvents 
                        color={creator.rank === 1 ? 'primary' : 'secondary'} 
                        fontSize="small" 
                      />
                    )}
                    <Typography>{creator.rank}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={creator.profileImage} />
                    <Box>
                      <Typography variant="subtitle2">{creator.nickname}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {creator.wallet}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Favorite color="error" fontSize="small" />
                    {creator.cheers.toLocaleString()}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Token color="primary" fontSize="small" />
                    {creator.rewards.toLocaleString()}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {creator.badges.map((badge) => (
                      <Chip
                        key={badge.name}
                        label={badge.name}
                        size="small"
                        color={badge.type === 'rank' ? 'primary' : 'secondary'}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <TrendingUp color="success" fontSize="small" />
                    {creator.growthRate}%
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {creator.socialLinks.youtube && (
                      <Tooltip title="YouTube">
                        <IconButton size="small" href={creator.socialLinks.youtube}>
                          <YouTube fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {creator.socialLinks.instagram && (
                      <Tooltip title="Instagram">
                        <IconButton size="small" href={creator.socialLinks.instagram}>
                          <Instagram fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RankingList;
