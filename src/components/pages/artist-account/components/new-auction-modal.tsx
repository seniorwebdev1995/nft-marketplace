import React, { useState } from "react";
import {
  useMediaQuery,
  Typography,
  Box,
  Stack,
  Input,
  FormControl,
  FormHelperText,
  InputLabel,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  styled,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import CloseIcon from "@mui/icons-material/Close";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { NotificationManager } from "react-notifications";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useForm, useField } from "react-final-form-hooks";
// import { Form, Field } from 'react-final-form';
// import { FieldArray } from 'react-final-form-arrays';
import { useMutation } from "@apollo/client";

import { AppTextField } from "../../../components/inputs/text";
import { ButtonGradient } from "../../../components/buttons/button-gradient";
import { useBlockchainContext } from "../../../../context";
import { theme } from "../../../../config/theme";

import { CREATE_AUCTION } from "../../../gql/mutations";
import DropZone from "../../../components/dropzone";

interface Props {
  open: boolean;
  onClose: () => void;
  auctionCreated: (...args: any[]) => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    }
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiTabPanel-root": {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: "19px"
    }
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 3,
        fontSize: "24px",
        fontStyle: "Bold",
        fontFamily: "Overpass",
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 20,
            top: 20,
            color: (theme) => theme.palette.grey[100],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface State {
  benefitN1: string;
  benefitN2: string;
  benefitN3: string;
  benefitLength: number;
  benefits: string[];

}

export const NewAuctionModal = ({ open, onClose, auctionCreated }: Props) => {
  const [createAuction] = useMutation(CREATE_AUCTION);

  const [cover, setCover] = useState(null);
  const [coverImage, setCoverImage] = useState('');

  const { translateLang } = useBlockchainContext();
  const mediumViewport = useMediaQuery(theme.breakpoints.down("md"));

  const [values, setValues] = useState<State>({
    benefitN1: "",
    benefitN2: "",
    benefitN3: "",
    benefitLength: 1,
    benefits: [],
  });

  const [submit, setSubmit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [startDateValue, setStartDateValue] = useState<Date | null>(null);
  const [endDateValue, setEndDateValue] = useState<Date | null>(null);

  const handleBenefitsChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (value.length > 50) value = value.substring(0, 50);
    setValues({ ...values, [prop]: value });
    validate();
  };

  const handleSelectFile = file => {
    setCover(file);
    const reader = new FileReader();
    reader.onload = () => {
      setCoverImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  const handleClickAddBenefit = () => {
    setValues({
      ...values,
      benefitLength: values.benefitLength < 3 ? values.benefitLength + 1 : 3
    })
  };
 
  // End drag and drop file upload

  const validate = (values: any = {}) => {
    const errors: any = {};

    if (!values.auction) {
      errors.auction = translateLang("required");
    }
    if (!values.desc) {
      errors.desc = translateLang("required");
    }

    if (!startDateValue) {
      errors.startDate = translateLang("required");
    }

    if (!endDateValue) {
      errors.endDate = translateLang("required");
    }

    if (!values.price) {
      errors.price = translateLang("required");
    } else if ((!new RegExp(/^\d+$/).test(values.price))) {
      errors.price = "Numbers only";
    } else if (Number(values.price) > 999999) {
      errors.price = "Price should not be more than 999999";
    }

    return errors;
  };

  const onSubmit = async (obj: {
    auction: string;
    desc: string;
    vurl: string;
    vdesc: string;
    startDate: string;
    endDate: string;
    price: number;
    benefits: [string];
  }) => {
    try {
      const utilities = [values.benefitN1, values.benefitN2, values.benefitN3];
      if (startDateValue && endDateValue && startDateValue > endDateValue) {
        NotificationManager.error("Start date should be less than end date");
        return;
      }
      const payload = {
        coverFile: cover,
        name: obj.auction,
        description: obj.desc,
        startingPrice: Number(obj.price),
        startDate: startDateValue?.toISOString(),
        endDate: endDateValue?.toISOString(),
        videoURL: obj.vurl,
        videoDesc: obj.vdesc,
        utilities: utilities,
      };
      console.log("Payload: ", payload);
      if (cover) {
        setIsLoading(true);

        const result = await createAuction({
          variables: payload
        });
        console.log("Submitted data result.", result);

        if (result) {
          auctionCreated({
            coverUrl: result.data.createAuction.coverUrl,
            nickName: result.data.createAuction.artist.nickname,
            auctionName: result.data.createAuction.name
          });
          NotificationManager.success("Auction created!");
        }

        form.reset();

        setSubmit(false);
        setIsLoading(false);
        setValues({
          benefitN1: "",
          benefitN2: "",
          benefitN3: "",
          benefitLength: 1,
          benefits: [],
        });
        setCover(null);
      }
    } catch (e: any) {
      console.log(e);
      NotificationManager.error("Please try again");

      setIsLoading(false);
      setSubmit(false);
    }
  };

  const preHandleSubmit = () => {
    setSubmit(true);

    handleSubmit();
  }

  const { form, handleSubmit } = useForm({
    onSubmit, // the function to call with your form values upon valid submit
    validate,
    initialValues: {
      auction: "",
      desc: "",
      vurl: "",
      vdesc: "",
      startDate: "",
      endDate: "",
    }, // a record-level validation function to check all form values
  });

  const auction = useField("auction", form);
  const desc = useField("desc", form);

  const vurl = useField("vurl", form);
  const vdesc = useField("vdesc", form);

  const price = useField("price", form);
  const startDate = useField("startDate", form);
  const endDate = useField("endDate", form);
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        Create auction
      </BootstrapDialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Stack spacing={3}>
            <Stack spacing={3}>
              <Stack spacing={2} direction="row" justifyContent="center">
                <div>
                  <DropZone fileTypes={["JPG", "JPEG", "PNG", "GIF"]} multiple={false} handleChange={handleSelectFile}>
                    <Stack
                      justifyContent="center"
                      alignItems="center"
                      spacing={3}
                      sx={{
                        width: "215px",
                        height: "215px",
                        padding: "5px",
                        border: (submit && !cover) ? "1px dashed #DE350B" : "1px dashed rgba(255, 255, 255, 0.2)",
                        borderRadius: "4px",
                      }}
                    >
                      {coverImage ? (
                        <img width="100%" height="100%" src={coverImage} alt="cover-img" style={{ objectFit: "cover" }}/>
                      ) : (
                        <div>
                          <FileDownloadOutlinedIcon />
                          <Box
                            component="span"
                            color="#FFFFFFB0"
                            fontSize={12}
                            maxWidth="100%"
                          >
                            <Typography
                              color="#3495FB"
                              marginLeft="8px"
                              fontSize={12}
                              sx={{
                                display: "inline-block",
                                lineHeight: "180%",
                                cursor: "pointer",
                                fontFamily: "Roboto",
                              }}
                              onClick={() => { }}
                            >
                              {"Choose a file"}
                            </Typography>
                            {" or drag it here"}
                          </Box>
                        </div>
                      )}
                    </Stack>
                  </DropZone>
                  {(cover === null && submit) && <FormHelperText id="component-error-text" style={{ color: "#DE350B" }}>Required</FormHelperText>}
                </div>
              </Stack>
              <Stack spacing={2}>
                {[
                  {
                    label: "Auction name",
                    props: { ...auction.input },
                    meta: { ...auction.meta },
                  },
                  {
                    label: "Description",
                    props: { ...desc.input },
                    meta: { ...desc.meta },
                  },
                  {
                    label: "Video URL (optional)",
                    props: { ...vurl.input },
                    meta: { ...vurl.meta },
                  },
                  {
                    label: "Video Desc (optional)",
                    props: { ...vdesc.input },
                    meta: { ...vdesc.meta },
                  },
                ].map((input, i) => (
                  <AppTextField
                    key={i}
                    error={input.meta.submitFailed && input.meta.error}
                    variant="standard"
                    helperText={
                      input.meta.submitFailed &&
                      input.meta.error &&
                      input.meta.error
                    }
                    multiline={input.label === "Description" ? true : false}
                    rows={input.label === "Description" ? 3 : 1}
                    maxRows={5}
                    label={input?.label}
                    type={"text"}
                    {...input.props}
                  />
                ))}
              </Stack>
            </Stack>
            <Stack spacing={2}>
              <Stack spacing={2} direction="row">
                <DateTimePicker
                  label="Start date"
                  value={startDateValue}
                  minDate={new Date()}
                  onChange={(newValue) => {
                    setStartDateValue(newValue);
                  }}
                  renderInput={(params) => (
                    <AppTextField
                      variant="standard"
                      {...params}
                      { ...startDate.input }
                      error={submit && !startDateValue}
                      helperText={
                        startDate.meta.submitFailed && startDate.meta.error && startDate.meta.error
                      }
                    />
                  )}
                  InputProps={{
                    sx: {
                      "& .MuiInputBase-input": { width: "181px" },
                      "& .MuiSvgIcon-root": {
                        width: "16px",
                        height: "16px",
                      },
                    },
                  }}
                />
                <DateTimePicker
                  label="End date"
                  value={endDateValue}
                  minDate={new Date()}
                  onChange={(newValue) => {
                    setEndDateValue(newValue);
                  }}
                  renderInput={(params) => (
                    <AppTextField
                      variant="standard"
                      {...params}
                      { ...endDate.input }
                      error={submit && !endDateValue}
                      helperText={
                        endDate.meta.submitFailed && endDate.meta.error && endDate.meta.error
                      }
                    />
                  )}
                  InputProps={{
                    sx: {
                      "& .MuiInputBase-input": { width: "181px" },
                      "& .MuiSvgIcon-root": {
                        width: "16px",
                        height: "16px",
                      },
                    },
                  }}
                />{" "}
              </Stack>

              <Stack alignItems="start">
                {[
                  {
                    label: "Start price in EUR",
                    props: { ...price.input },
                    meta: { ...price.meta },
                  },
                ].map((input, i) => (
                  <AppTextField
                    key={i}
                    error={input.meta.submitFailed && input.meta.error}
                    variant="standard"
                    helperText={
                      input.meta.submitFailed &&
                      input.meta.error &&
                      input.meta.error
                    }
                    multiline={input.label === "Description" ? true : false}
                    maxRows={5}
                    label={input?.label}
                    type={"text"}
                    {...input.props}
                  />
                ))}
              </Stack>

              <FormControl
                sx={{ m: 1, width: "100%" }}
                variant="standard"
                error={values.benefitN1 === "" && submit}
              >
                <InputLabel
                  htmlFor="standard-adornment-benefit"
                  sx={{ fontSize: "12px" }}
                >
                  Benefits
                </InputLabel>
                <Input
                  id="standard-adornment-benefit"
                  type={"text"}
                  value={values.benefitN1}
                  required
                  onChange={handleBenefitsChange("benefitN1")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle benefits visibility"
                        onClick={handleClickAddBenefit}
                      >
                        {(values.benefitLength === 1) ? (
                          <ControlPointIcon />
                        ) : (
                          null
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {(values.benefitN1 === "" && submit) && <FormHelperText id="component-error-text">Required</FormHelperText>}
              </FormControl>
              {values.benefitLength > 1 && <FormControl
                sx={{ m: 1, width: "100%" }}
                variant="standard"
                error={values.benefitN2 === "" && submit}
              >
                <InputLabel
                  htmlFor="standard-adornment-benefit2"
                  sx={{ fontSize: "12px" }}
                >
                  Benefits
                </InputLabel>
                <Input
                  id="standard-adornment-benefit"
                  type={"text"}
                  value={values.benefitN2}
                  required
                  onChange={handleBenefitsChange("benefitN2")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle benefits2 visibility"
                        onClick={handleClickAddBenefit}
                      >
                        {(values.benefitLength === 2) ? (
                          <ControlPointIcon />
                        ) : (
                          null
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {(values.benefitN2 === "" && submit) && <FormHelperText id="component-error-text">Required</FormHelperText>}
              </FormControl>}
              {values.benefitLength > 2 && <FormControl
                sx={{ m: 1, width: "100%" }}
                variant="standard"
                error={values.benefitN3 === "" && submit}
              >
                <InputLabel
                  htmlFor="standard-adornment-benefit3"
                  sx={{ fontSize: "12px" }}
                >
                  Benefits
                </InputLabel>
                <Input
                  id="standard-adornment-benefit3"
                  type={"text"}
                  value={values.benefitN3}
                  required
                  onChange={handleBenefitsChange("benefitN3")}
                />
                {(values.benefitN3 === "" && submit) && <FormHelperText id="component-error-text">Required</FormHelperText>}
              </FormControl>}
            </Stack>
          </Stack>

          <Stack alignItems="end" marginTop={"24px"}>
            <ButtonGradient
              fullWidth={mediumViewport && true}
              loading={isLoading}
              label={"Create"}
              onClick={preHandleSubmit}
            />
          </Stack>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
};
