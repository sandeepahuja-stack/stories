import { Box, Container, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import { SearchStyled, SearchIconWrapper, StyledInputBase, ModalBoxStyled, ModalResultWrapper, SearchIconBackButton } from "./Search.style";
import { ReactComponent as SearchIcon } from '../../../assets/svg/SearchIcon.svg';
import { ReactComponent as BackIcon } from '../../../assets/svg/BackIcon.svg';
import Pagination from "../Pagination";
import { useCallback } from "react";
import SearchCard from "../Search/Search";
import { loadsearchAsync } from "../../../redux/reducers/search/search.thunk";
// import IStore from "../../../redux/responseInterface/IStore";

const SearchModal = ({open, handleClose}: {
  open: boolean;
  handleClose: ()=>void;
} ) => {
  
    const dispatch = useDispatch();
  
    const [value, setValue] = useState('');
    

    const handleChange = (e: any)=>{
      setValue(e.target.value);
    }
    const debouncedSearchTerm = useDebounce(value,500)
     // Effect for API call
    useEffect(
      () => {
        if (debouncedSearchTerm) {
          dispatch(loadsearchAsync(debouncedSearchTerm, 1));
        } 
      },
      [debouncedSearchTerm, dispatch] // Only call effect if debounced search term changes
    );
    const [index , updateIndex] = useState(1);
    const paginationChange = useCallback((pageNumber: number) => {  
      dispatch(loadsearchAsync(value, pageNumber));
      updateIndex(pageNumber);
    },[value, dispatch]);


    return( 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        data-testid="search-modal"
      >
        <Container > 
          <ModalBoxStyled >
            <SearchStyled>
            <SearchIconBackButton onClick={handleClose} data-testid="back-button">
              <BackIcon title="back button" />
            </SearchIconBackButton>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleChange}
                value={value}
                autoFocus
              />
            </SearchStyled>
            {value &&  <><ModalResultWrapper>
              <SearchCard />
            </ModalResultWrapper>
            <Box mt="20px" display="flex" justifyContent="center"><Pagination index={index} count={10} onChange={paginationChange} /></Box></>}
          </ModalBoxStyled>
        </Container>
      </Modal>
      )
}

export default SearchModal;