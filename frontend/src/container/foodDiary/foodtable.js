import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';

function Row({rec}) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <CIcon  icon={icon.cilChevronTop} size="lg"/> : <CIcon  icon={icon.cilChevronBottom} size="lg"/>}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {rec.recipe.label}
        </TableCell>
        <TableCell align="right"style={{width:'10%'}}><input style={{width:'50px'}} type='number'/></TableCell>
        <TableCell align="right">{rec.recipe.calories.toFixed(1)}</TableCell>
        <TableCell align="right">{rec.recipe.digest[1].total.toFixed(1)}</TableCell>
        <TableCell align="right">{rec.recipe.digest[2].total.toFixed(1)}</TableCell>
        <TableCell align="right">{rec.recipe.digest[0].total.toFixed(1)}</TableCell>
        <TableCell className="foottable-add"style={{cursor:'pointer',textAlign:'center'}}><CIcon  icon={icon.cilPlus} size="lg"/></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 0 }}>
                {rec&&<div style={{paddingTop:'20px'}} className=" singlePost container-fluid">
        <div className=" singlePostWrapper row">
          <div className="foodtable-img col-12">
              <img style={{ height: '100%', width: 'auto' }} src={rec.recipe.image} alt="" className="singlePostImg imag" />
          </div>
          <div className="col-12 singlepost-label">
            <div style={{textAlign:'center'}} className='singlePostHeading'>{rec.recipe.label}</div>
          </div>
        </div>
        <div className='row'>
          <div className='col-6 singlepost-left'>
            <div className='singlepost-left-item1'>
              <div className='singlepost-headding'>
                Nutrient Info
              </div>
              <div className='singlepost-item-main container'>
                {rec.recipe.digest.map((item)=>(
                <div className='row'>
                    <span className='col-4 singlepost-item-label'>
                    {item.label}</span><span className='col-2'>:</span> <span className='col-6 singlepost-item-value'>
                  {item.total.toFixed(2)}
                </span>
                  </div>
                ))}
              </div>
            </div>
           <div className='singlepost-right-item2'>
              <div className='singlepost-headding'>
                Caution
              </div>
              <ul className='singlepost-item-main container'>
                {rec.recipe.cautions.map(item=><li>{item}</li>)}
              </ul>
            </div>
          </div>
          <div className='col-6 singlepost-right'>
          <div className='singlepost-right-item1'>
              <div className='singlepost-headding'>
                Cuisine Type
              </div>
              <ul className='singlepost-item-main container'>
                {rec.recipe.cuisineType.map(item=><li>{item}</li>)}
              </ul>
            </div>
            
            <div className='singlepost-right-item3'>
              <div className='singlepost-headding'>
                Ingredients
              </div>
              <ol className='singlepost-item-main container'>
                {rec.recipe.ingredientLines.map(item=><li>{item}</li>)}
              </ol>
            </div>
            <div className='singlepost-left-item2'>
            <div className='singlepost-headding'>
                Health Labels
              </div>
              <ul>{rec.recipe.healthLabels.map(item=><li>{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function FoodTable({res}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Food</TableCell>
            <TableCell>Gram</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Add</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {res.length!==0&&res.map((row,index) => (
            <Row rec={row} key={index}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}