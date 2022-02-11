import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import * as React from 'react';
import {useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { styled, alpha } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const useStyles = makeStyles({
  list: {
    width: 250,
  }
});

const theme = createTheme({ //1 use case for createTheme is when you want to override a default style of some mui component
  components: {
    MuiListItem: { //to override ListItem prop, use MuiListItem (from docs)
      styleOverrides: { //before overriding, inspect the element to find the exact prop to override!!!
        root: { //it will override MuiListItem-root class
          width: '250px', //overriding width prop
          // textAlign:"center",
        },
      },
    },
    MuiListItemButton: { //it will override MuiListItemButton-root class
      styleOverrides:{
        root:{
          textAlign:"center",
        }
      }
    }
  },
});

const Navigation = () => {
  const classes = useStyles()
  const [state, setState] = useState({
      left: false,
  });
const toggleDrawer =
(anchor: string, open: boolean) =>
(event: React.KeyboardEvent | React.MouseEvent) => {
  if (
    event &&
    event.type === 'keydown' &&
    ((event as React.KeyboardEvent).key === 'Tab' ||
      (event as React.KeyboardEvent).key === 'Shift')
  ) {
    return;
  }
  setState({ ...state, "left": open });
};
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
    const Search = styled('div')(({ theme }) => {console.log("th1: ", theme); return ({ //styled() will add default theme (as a css class) to the div
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%', //<Search/> div will be 100% in width when screen width is smaller than "sm"
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3), //it will override marginLeft prop above when screen width is equal to or above 'sm'
          width: 'auto',
        },
      })});
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      const StyledInputBase = styled(InputBase)(({ theme }) => {console.log("th2: ", theme); return ({//styled() will add default theme (as a css class) to the InputBase comp
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
          [theme.breakpoints.down('md')]: { //when screen width is below "md", remove the left padding
            paddingLeft:theme.spacing(0),
          },
        },
      })});
    return (
        <div>
            <SwipeableDrawer
                anchor={"left"}
                open={state.left}
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
            >   {/*<SwipeableDrawer/> can be put to anywhere*/}
                <List>
                  <ThemeProvider theme={theme}> {/*to apply style overrides (defined in "theme") use <ThemeProvider/> component*/}
                  <ListItem disablePadding>
                    <ListItemButton component="a" href="#posts" onClick={()=>{}}> {/*"a" means anchor*/}
                      <ListItemText primary="Posts" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton onClick={()=>{}}> {/*"a" means anchor*/}
                      <ListItemText primary="Users" />
                    </ListItemButton>
                  </ListItem>
                  </ThemeProvider>
                </List> 
            </SwipeableDrawer>
            <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 /*sx provides an alias for "margin-right" as "mr*/ }}
            onClick={toggleDrawer("left", true)}
          > {/*why do wwe need IconButton? -> If you want to turn an icon into a clickable button; -> if you want to add onClick to the icon; you need IconButton; you can't apply onClick directly to a mui icon*/}
            <MenuIcon/>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Ozod Vatan - admin page
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} /> {/*just a wide separator container*/}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}> {/*Box is just a wrapper <div/>, it will be displayed as flex (i.e. "display: flex") when the screen size is md*/}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}> {/*Box is just a wrapper <div/>, it will be displayed as flex (i.e. "display: flex") when the screen size is xs; this Box is for mobile view*/}
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  </div>
    )
}

export default Navigation;