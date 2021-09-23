import React, { useEffect, useState } from 'react'

import axios from 'axios'
import {
    Box, Typography, InputLabel, MenuItem, Button,
    FormControl, Select, Checkbox, TextField, FormControlLabel
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PaperCard from './PaperCard';
import DateRangePicker from '@mui/lab/DateRangePicker';

function formatDate(date, format) {
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
    return format;
};

export default function ArxivPapers() {
    const [arxiv_query_id, setArxivQueryID] = useState('')
    const [is_stocked, setIsStocked] = useState(false)
    const [page, setPage] = useState(1)
    const [query_list, setQueryList] = useState([])
    const [published_at, setPublishedAt] = React.useState([null, null]);
    const [paper_list, setPaperList] = useState([])
    const [all_page_size, setAllPageSize] = useState(0)
    const [visible_pagination, setVisiblePagination] = useState(false)



    useEffect(() => {

        axios.get(`https://localhost/arxiv_query/`)
            .then(res => {

                let arxiv_queries = res.data['arxiv_queries'].map(element => <MenuItem
                    key={element['arxiv_query_id']}
                    value={element['arxiv_query_id']}>{element['arxiv_query']}
                </MenuItem>)
                arxiv_queries.unshift(<MenuItem key={0} value={0}>全て</MenuItem>)
                setQueryList(arxiv_queries)
            })
    }, [])

    const handleChange = (event) => {
        setArxivQueryID(event.target.value);
    };

    const handlePageChange = (event, value) => {
        setPage(value)
        const json_body = {
            published_at: published_at.map(element => !element ? '' : formatDate(element, 'yyyy/MM/dd')),
            arxiv_query_id: Number(arxiv_query_id),
            is_stocked: is_stocked,
            page: value
        };

        axios.post(`https://localhost/papers/`, json_body)
            .then(res => {
                console.log(res.data)
                setPage(res.data.current_page)
                setPaperList(res.data.papers.map(element => <PaperCard key={element['paper_id']}
                    paper_id={element['paper_id']}
                    title={element['title']}
                    abstract={element['abstract']}
                    published_at={element['published_at']}
                    pdf_link={element['pdf_link']}
                    is_stocked={element['is_stocked']}
                />))
            })
    };

    const handleClickSearch = () => {
        const json_body = {
            published_at: published_at.map(element => !element ? '' : formatDate(element, 'yyyy/MM/dd')),
            arxiv_query_id: Number(arxiv_query_id),
            is_stocked: is_stocked,
            page: 1
        };

        axios.post(`https://localhost/papers/`, json_body)
            .then(res => {
                setAllPageSize(res.data.all_page_size)
                setPage(res.data.current_page)
                setPaperList(res.data.papers.map(element => <PaperCard key={element['paper_id']}
                    paper_id={element['paper_id']}
                    title={element['title']}
                    abstract={element['abstract']}
                    published_at={element['published_at']}
                    pdf_link={element['pdf_link']}
                    is_stocked={element['is_stocked']}
                />))
                if (res.data.papers.length !== 0){
                    setVisiblePagination(true)
                }else{
                    setVisiblePagination(false)
                }
            })
    };

    useEffect(() => {
        setPaperList([])
        setVisiblePagination(false)
    }, [arxiv_query_id, is_stocked, published_at])

    return (
        <div>
            <Typography variant="h4" component="div" sx={{ m: 2 }}>論文一覧</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ maxWidth: 1200, display: 'flex' }}>
                    <FormControl sx={{ width: 300 }}>
                        <InputLabel id="demo-simple-select-label">キーワード</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={arxiv_query_id}
                            onChange={handleChange}>
                            {query_list}
                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DateRangePicker
                            startText="Check-in"
                            endText="Check-out"
                            inputFormat="yyyy/MM/dd"
                            mask="____/__/__"
                            value={published_at}
                            onChange={(newValue) => {
                                setPublishedAt(newValue);
                            }}
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} />
                                </React.Fragment>
                            )}
                        />
                    </LocalizationProvider>
                    <FormControlLabel
                        control={<Checkbox checked={is_stocked}
                            onChange={() => (setIsStocked(!is_stocked))} />}
                        label="ストックのみ表示"
                        labelPlacement="top"
                    />
                    <Button variant="contained" sx={{ m: 2 }} onClick={handleClickSearch}>検索</Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' , width: 1600, height: 700}}>
                    {paper_list}
                </Box>
                {visible_pagination && <Pagination count={all_page_size} page={page} onChange={handlePageChange} color="primary" />}
            </Box>
        </div>
    )
}
