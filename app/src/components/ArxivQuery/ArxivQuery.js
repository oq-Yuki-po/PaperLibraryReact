import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';

import ArxivQueryForm from './ArxivQueryForm'
import ArxivQueryItem from './ArxivQueryItem'

export default function ArxivQuery() {

    const [QueryList, setQueryList] = useState([])

    useEffect(() => {
        axios.get(`https://localhost/arxiv_query/`)
            .then(res => {
                setQueryList(res.data['arxiv_queries'].map(element => <ArxivQueryItem
                    key={element['arxiv_query_id']}
                    arxiv_query_id={element['arxiv_query_id']}
                    arxiv_query={element['arxiv_query']}
                    is_active={element['is_active']} />))
            })
    }, [])

    function AddQueryItem(item) {

        let new_arxiv_query_item = < ArxivQueryItem key={item['arxiv_query_id']}
            arxiv_query_id={item['arxiv_query_id']}
            arxiv_query={item['arxiv_query']}
            is_active={item['is_active']} />

        setQueryList([...QueryList, new_arxiv_query_item])
    }

    return (
        <div>
            <h1 className='arxiv-query-title'>検索キーワード登録</h1>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>

                <ArxivQueryForm AddQueryItem={AddQueryItem} />
                <ul>
                    {QueryList}
                </ul>
            </Box>
        </div>
    )
}
