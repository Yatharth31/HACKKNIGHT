import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    maxHeight: 440,
}));

const RankCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.primary.main,
}));

const ScoreCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
}));

const HighlightedRow = styled(TableRow)(({ theme, rank }) => {
    let backgroundColor;
    switch (rank) {
        case 1:
            backgroundColor = '#FFD700'; // Gold
            break;
        case 2:
            backgroundColor = '#C0C0C0'; // Silver
            break;
        case 3:
            backgroundColor = '#CD7F32'; // Bronze
            break;
        default:
            backgroundColor = 'transparent';
    }
    return {
        backgroundColor,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    };
});

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/leaderboard');
                const sortedData = response.data.leaderboard.sort((a, b) => b.score - a.score);
                setLeaderboard(sortedData);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <StyledPaper>
            <StyledTableContainer>
                <Table stickyHeader aria-label="leaderboard table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaderboard.map((row, index) => (
                            <HighlightedRow key={index} rank={index + 1}>
                                <RankCell>{index + 1}</RankCell>
                                <TableCell>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {row.full_name}
                                    </div>
                                </TableCell>
                                <ScoreCell align="right">{row.score}</ScoreCell>
                            </HighlightedRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </StyledPaper>
    );
};

export default Leaderboard;
