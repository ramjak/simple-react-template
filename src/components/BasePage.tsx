import classes from "./BasePage.module.scss";

interface IBasePage {
  children: React.ReactNode;
}

function BasePage(props: IBasePage) {
  const { children } = props;

  return (
    <div className={classes.app}>
      <div className={classes.content}>{children}</div>
    </div>
  );
}

export default BasePage;
