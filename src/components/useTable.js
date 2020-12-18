import React , {useState } from 'react'
import {Table,TableHead, TableRow, TableCell, TableSortLabel, makeStyles, TablePagination} from '@material-ui/core'


const useStyles=makeStyles(theme=>({
   table:{
       marginTop: theme.spacing(3),
       '& thead th': {
        fontWeight: '600',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
    },
    '& tbody td': {
        fontWeight: '300',
    },
    '& tbody tr:hover': {
        backgroundColor: '#fffbf2',
        cursor: 'pointer',
    },
   }
}))

export default function useTable(records, headCells, filterFn) {
    
   const classes = useStyles()

   const pages =[5,10,25, 50]
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(pages[page])
   const [order, setOrder] =useState()
   const [orderBy, setOrderby]=useState()


   // common table container 
    const TblContainer = (props)=>(
        <Table  className={classes.table}>
        {props.children}
        </Table>
    )
   // common table head
     const TblHead =props=>{

      const handleSortRequest = cellId =>{
        const isAsc =orderBy ===  cellId && order === "asc";
        setOrder(isAsc? 'desc':'asc' )
        setOrderby(cellId)
      } 

         return (<TableHead>
             <TableRow>
                 {
                     headCells.map(head=>(
                     <TableCell key={head.id}
                     sortDirection={orderBy===head.id?order:false}
                     >
                     <TableSortLabel key={head.id}
                     active={orderBy===head.id}
                     direction={orderBy === head.id? order:'asc' }
                     onClick={()=>{handleSortRequest(head.id)}}>
                     {head.label}
                     </TableSortLabel>
                     </TableCell>))
                 }
             </TableRow>
         </TableHead>)
     }

    const handleChangePage =(event, newPage)=>{
        setPage(newPage)
    }

    const handleChangeRowsPerPage =(event)=>{
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    // common paging parts
     const TblPagination =() => (<TablePagination
        component ="div"
        page={page}
        rowsPerPageOptions = {pages}
        rowsPerPage ={rowsPerPage}
        count={records.length}
        onChangePage ={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        />)
    
     function stableSort(array, comparator){
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
     }
     function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }
    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const recordsAfterPagingAndSorting = () => {
        return stableSort(filterFn.fn(records), getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }
}

