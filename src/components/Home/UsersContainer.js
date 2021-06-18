import React, { Suspense } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TechGroupSelectInput from "./TechGroupSelectInput";
import AvgMarkFilterSelectInput from "./AvgMarkFilterSelectInput";
import ShowInactiveUsersCheckbox from "./ShowInactiveUsersCheckbox";
import UserListsContainer from "./UserListsContainer";
import CircleProgressBar from "../UI/CircleProgressBar";

function UsersContainer() {
  return (
    <>
      <Box my={5}>
        <Grid container spacing={3} alignItems={"center"}>
          <Grid item xs={12} sm={6} md={4}>
            <Suspense fallback={<CircleProgressBar />}>
              <TechGroupSelectInput />
            </Suspense>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <AvgMarkFilterSelectInput />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <ShowInactiveUsersCheckbox />
          </Grid>
        </Grid>
      </Box>
      <Suspense
        fallback={<CircleProgressBar size={30} containerHeight={200} />}
      >
        <UserListsContainer />
      </Suspense>
    </>
  );
}

export default UsersContainer;
