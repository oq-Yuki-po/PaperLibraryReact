import React from 'react'
import HeaderNavLink from './HeaderNavLink'
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        論文まとめ
                    </Typography>
                    <HeaderNavLink link='/' link_name='論文一覧' />
                    <HeaderNavLink link='/arxiv_query' link_name='検索キーワード登録' />
                </Toolbar>
            </AppBar>
        </Box>
    )
}
