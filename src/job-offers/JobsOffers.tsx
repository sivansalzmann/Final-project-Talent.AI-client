import {
  Button,
  CardActions,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Chip from "../ui-components/Chip";
import { gridSpacing } from "../types/constant";
import MainCard from "../ui-components/MainCard";
import { JobOffer } from "../types/jobOffer-types";
import PositionCandidates from "../candidate/PositionCandidates";
import JobOfferInfo from "./JobOfferInfo";

interface jobOffersProps {
  jobOffers?: JobOffer[];
}
const update = {
  status: "lala",
  full_name: "sivan",
};

const handleEditJobOffer = (jobOffer: JobOffer, update: Object) => {
  fetch(`http://localhost:3000/api/joboffer/${jobOffer._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      updateJobOffer: update,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    });
};

const handleDeleteJobOffer = (jobOffer: JobOffer) => {
  fetch(`http://localhost:3000/api/joboffer/${jobOffer._id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((result) => {});
};

const JobsOffers = ({ jobOffers }: jobOffersProps) => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard title="Latest job offers" content={false}>
          <TableContainer>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Job ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Job Title</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobOffers
                  ? jobOffers.map((jobOffer) => (
                      <TableRow
                        hover
                        key={jobOffer.job_offer_ID}
                        component={"tr"}
                      >
                        <TableCell>{jobOffer._id}</TableCell>
                        <TableCell>{jobOffer.job_title_sub_role}</TableCell>
                        <TableCell>{jobOffer.job_title_role}</TableCell>
                        <TableCell align="center">
                          <Chip
                            chipcolor={jobOffer.status}
                            label={jobOffer.status}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center" sx={{ pr: 3 }}>
                          <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <JobOfferInfo jobOffer={jobOffer} />
                            <PositionCandidates jobOffer={jobOffer} />
                            <IconButton
                              size="large"
                              onClick={() =>
                                handleEditJobOffer(jobOffer, update)
                              }
                            >
                              <EditOutlinedIcon />
                            </IconButton>

                            <IconButton
                              size="large"
                              onClick={() => handleDeleteJobOffer(jobOffer)}
                            >
                              <DeleteOutlineOutlinedIcon />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant="text" size="small" color="secondary">
              View all jobs offer
            </Button>
          </CardActions>
        </MainCard>
      </Grid>
    </Grid>
  );
};
export default JobsOffers;
