const CurrentYear = () => {
  return (
    <p className="text-center text-xs text-muted-foreground">© Rentia {new Date().getFullYear()}</p>
  );
};
export default CurrentYear;
