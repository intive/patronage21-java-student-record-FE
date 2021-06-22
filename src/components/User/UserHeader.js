import React from "react";
import { useRecoilValue } from "recoil";
import { userProperty } from "../../state/atoms";
import Grid from "@material-ui/core/Grid";
import SiteHeader from "../UI/SiteHeader";
import Image from "./Image";

function UserHeader() {
  const firstName = useRecoilValue(userProperty("firstName"));
  const lastName = useRecoilValue(userProperty("lastName"));

  return (
    <Grid container spacing={2} direction={"row"} alignItems="center">
      <Grid item>
        <Image firstName={firstName} />
      </Grid>
      <Grid item>
        <SiteHeader>
          {firstName} {lastName}
        </SiteHeader>
      </Grid>
    </Grid>
  );
}

export default UserHeader;
