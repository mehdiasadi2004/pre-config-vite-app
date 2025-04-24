export const ROUTES = {
  // @Segment: Main Routes
  Landing: "/",
  News: "/news",
  NewsDetail: (newsId: string) => `${ROUTES.News}/${newsId}`,
  AboutUs: "/about-us",
  ContactUs: "/contact-us",
  Error: "/error",
  NotFound: "/not-found",

  // @Segment: Auth Routes
  Login: "/login",
  Register: "/register",
  ForgetPassword: "/forget-password",

  // @Segment: Panel Routes
  Dashboard: "/panel",
  Profile: "/profile",
};
