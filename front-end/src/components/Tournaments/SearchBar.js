import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.35),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.45),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function SearchBar({ tournaments, game, tournamentState, registration, filtered, setFiltered, setActiveFilter, searchTerm, setSearchTerm }) {

  const tournamentTitleSearch = (ev) => {
    if (ev.target.value === '' && game === "All" && tournamentState === 'All' && registration === 'All') {
      setFiltered(tournaments);
      setActiveFilter(false);
      setSearchTerm(ev.target.value);
      return;
    }

    let tournamentList = [];
    if (ev.target.value !== '') {
      setSearchTerm(ev.target.value);
      setActiveFilter(true);
      if (filtered[0] === undefined) {
        setFiltered(tournaments);
        tournamentList = [...tournaments];
      } else {
        tournamentList = [...filtered];
      }
    } else {
      setSearchTerm(ev.target.value);
      return;
    }
    
    const filteredTournaments = [];
    for (let tournament of tournamentList) {
      const name = tournament.name.toLowerCase().trim();
      const search = ev.target.value.toLowerCase().trim();
      if (name.match(search)) {
        filteredTournaments.push(tournament);
      }
    }
    setFiltered(filteredTournaments);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search tournament name"
        inputProps={{ 'aria-label': 'search' }}
        value={searchTerm}
        onChange={(ev) => tournamentTitleSearch(ev)}
        id="search-input"
      />
    </Search>
  );
}