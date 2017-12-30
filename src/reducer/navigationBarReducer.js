export const navigationBarReducer = (state = { activeLink: "rank" }, action) => {
  switch (action.type) {
    case "navigationBar_rcm":
      state = { activeLink: "rcm" };
      break;
    case "navigationBar_songlist":
      state = { activeLink: "songlist" };
      break;
    case "navigationBar_radio":
      state = { activeLink: "radio" };
      break;
    case "navigationBar_newmusic":
      state = { activeLink: "newmusic" };
      break;
    case "navigationBar_rank":
      state = { activeLink: "rank" };
      break;
    default:
        state = state;
  }
  return state;
};
