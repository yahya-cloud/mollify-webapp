import React from 'react'
import Button from '../..//UI/Button/Button'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#00b1e4',
    color: theme.palette.common.white,
    fontSize: 19,
  },
  body: {
    fontSize: 14,
    border: '1px solid #333',
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {},
}))(TableRow)

function createData(name, time, sessionType, disorder, photo, _id) {
  return { name, time, sessionType, disorder, photo, _id }
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  tableContainer: {
    marginBottom: '10rem',
  },
  tableHead: {
    fontSize: 19,
  },
  photo: {
    width: '3rem',
    height: '3rem',
    backgroundColor: '#ebebeb',
    borderRadius: '10px',
    marginRight: '1rem',
    backgroundSize: 'cover',
  },
})

const ScheduleTable = (props) => {
  const classes = useStyles()
  const rows = props.rows.map((el) =>
    createData(
      el.name,
      `${el.time.slice(0, 10)}, ${new Date(el.time).getHours()}:${new Date(
        el.time
      ).getMinutes()}`,
      el.sessionType,
      el.disorder,
      el.photo,
      el._id
    )
  )

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label='customized table'>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <StyledTableCell>Person</StyledTableCell>
            <StyledTableCell align='left'>Time</StyledTableCell>
            <StyledTableCell align='left'>Session Type</StyledTableCell>
            <StyledTableCell align='left'>Disorder</StyledTableCell>
            <StyledTableCell align='left'>Action Button</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell
                style={{ display: 'flex', alignItems: 'center' }}
                scope='row'>
                <div
                  style={{ backgroundImage: `url(${row.photo})` }}
                  className={classes.photo}></div>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align='left'>{row.time}</StyledTableCell>
              <StyledTableCell align='left'>{row.sessionType}</StyledTableCell>
              <StyledTableCell align='left'>{row.disorder}</StyledTableCell>
              <StyledTableCell align='left'>
                <Button
                  clickHandler={() => props.greenBtnFunc(row)}
                  btnType='btnAccept--small'>
                  Succeed
                </Button>
                {props.redBtnFunc && (
                  <Button
                    clickHandler={() => props.redBtnFunc(row._id)}
                    btnType='btnReject--small'>
                    Failed
                  </Button>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ScheduleTable
