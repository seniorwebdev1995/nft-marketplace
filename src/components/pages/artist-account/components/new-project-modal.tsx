import React, { useState } from "react";
import {
  useMediaQuery,
  Typography,
  Box,
  Stack,
  Button,
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

import { CREATE_PROJECT } from "../../../gql/mutations";
import DropZone from "../../../components/dropzone";

interface Props {
  open: boolean;
  onClose: () => void;
  projectCreated: (...args: any[]) => void;
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

  benefit2N1: string;
  benefit2N2: string;
  benefit2N3: string;
  benefit2Length: number;
  benefits2: string[];

  benefit3N1: string;
  benefit3N2: string;
  benefit3N3: string;
  benefit3Length: number;
  benefits3: string[];

  benefit4N1: string;
  benefit4N2: string;
  benefit4N3: string;
  benefit4Length: number;
  benefits4: string[];

  showPassword: boolean;
}

export const NewProjectModal = ({ open, onClose, projectCreated }: Props) => {
  const [createProject] = useMutation(CREATE_PROJECT);

  const [coverImage, setCoverImage] = useState('');
  const [coverNftImage, setCoverNftImage] = useState('');
  const [coverNft2Image, setCoverNft2Image] = useState('');
  const [coverNft3Image, setCoverNft3Image] = useState('');
  const [coverNft4Image, setCoverNft4Image] = useState('');

  const [cover, setCover] = useState(null);
  const [coverNft, setCoverNft] = useState(null);
  const [coverNft2, setCoverNft2] = useState(null);
  const [coverNft3, setCoverNft3] = useState(null);
  const [coverNft4, setCoverNft4] = useState(null);

  const { translateLang } = useBlockchainContext();
  const mediumViewport = useMediaQuery(theme.breakpoints.down("md"));

  const [values, setValues] = useState<State>({
    benefitN1: "",
    benefitN2: "",
    benefitN3: "",
    benefitLength: 1,
    benefits: [],

    benefit2N1: "",
    benefit2N2: "",
    benefit2N3: "",
    benefit2Length: 1,
    benefits2: [],

    benefit3N1: "",
    benefit3N2: "",
    benefit3N3: "",
    benefit3Length: 1,
    benefits3: [],

    benefit4N1: "",
    benefit4N2: "",
    benefit4N3: "",
    benefit4Length: 1,
    benefits4: [],

    showPassword: false,
  });

  const [nftNum, setNftNum] = useState<number>(1);
  const [submit, setSubmit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAnotherNftAdd = () => {
    if (nftNum < 4) {
      setNftNum(nftNum + 1);
    }
  };

  const handleBenefitsChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (value.length > 50) value = value.substring(0, 50);
    setValues({ ...values, [prop]: value });
    validate();
  };

  const handleClickAddBenefit = () => {
    setValues({
      ...values,
      benefitLength: values.benefitLength < 3 ? values.benefitLength + 1 : 3
    })
  };
  const handleClickAddBenefit2 = () => {
    setValues({
      ...values,
      benefit2Length: values.benefit2Length < 3 ? values.benefit2Length + 1 : 3
    })
  };
  const handleClickAddBenefit3 = () => {
    setValues({
      ...values,
      benefit3Length: values.benefit3Length < 3 ? values.benefit3Length + 1 : 3
    })
  };
  const handleClickAddBenefit4 = () => {
    setValues({
      ...values,
      benefit4Length: values.benefit4Length < 3 ? values.benefit4Length + 1 : 3
    })
  };

  const handleChangeFile = file => {
    setCover(file);
    const reader = new FileReader();
    reader.onload = () => {
      setCoverImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleChangeFileNft = file => {
    setCoverNft(file);
    const reader = new FileReader();
    reader.onload = () => {
      setCoverNftImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  const handleChangeFileNft2 = file => {
    setCoverNft2(file);
    const reader = new FileReader();
    reader.onload = () => {
      setCoverNft2Image(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  const handleChangeFileNft3 = file => {
    setCoverNft3(file);
    const reader = new FileReader();
    reader.onload = () => {
      setCoverNft3Image(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  const handleChangeFileNft4 = file => {
    setCoverNft4(file);
    const reader = new FileReader();
    reader.onload = () => {
      setCoverNft4Image(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validate = (values: any = {}) => {
    const errors: any = {};

    if (!values.project) {
      errors.project = translateLang("required");
    }
    if (!values.desc) {
      errors.desc = translateLang("required");
    }

    if (!values.name) {
      errors.name = translateLang("required");
    }
    if (nftNum === 2 && !values.name2) {
      errors.name2 = translateLang("required");
    }
    if (nftNum === 3 && !values.name3) {
      errors.name3 = translateLang("required");
    }
    if (nftNum === 4 && !values.name4) {
      errors.name4 = translateLang("required");
    }

    if (!values.price) {
      errors.price = translateLang("required");
    } else if ((!new RegExp(/^\d+$/).test(values.price))) {
      errors.price = "Numbers only";
    } else if (Number(values.price) > 999999) {
      errors.price = "Price should not be more than 999999";
    }
    if (nftNum === 2 && !values.price2) {
      errors.price2 = translateLang("required");
    } else if ((nftNum === 2 && !new RegExp(/^\d+$/).test(values.price2))) {
      errors.price2 = "Numbers only";
    }
    if (nftNum === 3 && !values.price3) {
      errors.price3 = translateLang("required");
    } else if ((nftNum === 3 && !new RegExp(/^\d+$/).test(values.price3))) {
      errors.price3 = "Numbers only";
    }
    if (nftNum === 4 && !values.price4) {
      errors.price4 = translateLang("required");
    } else if ((nftNum === 4 && !new RegExp(/^\d+$/).test(values.price4))) {
      errors.price4 = "Numbers only";
    }

    if (!values.supply || Number(values.supply) === 0) {
      errors.supply = translateLang("required");
    } else if ((!new RegExp(/^\d+$/).test(values.supply))) {
      errors.supply = "Numbers only";
    }
    if (nftNum === 2 && !values.supply2) {
      errors.supply2 = translateLang("required");
    } else if ((nftNum === 2 && !new RegExp(/^\d+$/).test(values.supply2))) {
      errors.supply2 = "Numbers only";
    }
    if (nftNum === 3 && !values.supply3) {
      errors.supply3 = translateLang("required");
    } else if ((nftNum === 3 && !new RegExp(/^\d+$/).test(values.supply3))) {
      errors.supply3 = "Numbers only";
    }
    if (nftNum === 4 && !values.supply4) {
      errors.supply4 = translateLang("required");
    } else if ((nftNum === 4 && !new RegExp(/^\d+$/).test(values.supply4))) {
      errors.supply4 = "Numbers only";
    }

    return errors;
  };

  const onSubmit = async (obj: {
    project: string;

    desc: string;
    vurl: string;
    vdesc: string;

    name: string;
    name2: string;
    name3: string;
    name4: string;

    price: number;
    price2: number;
    price3: number;
    price4: number;

    supply: number;
    supply2: number;
    supply3: number;
    supply4: number;

    benefits: [string];
    benefits2: [string];
    benefits3: [string];
    benefits4: [string];

    benefitN1: string;
    benefitN2: string;
    benefitN3: string;

    benefit2N1: string;
    benefit2N2: string;
    benefit2N3: string;

    benefit3N1: string;
    benefit3N2: string;
    benefit3N3: string;

    benefit4N1: string;
    benefit4N2: string;
    benefit4N3: string;
  }) => {
    try {
      let arr1: any[] = [];
      let arr2: any[] = [];
      let arr3: any[] = [];
      let arr4: any[] = [];

      arr1 = [...arr1, values.benefitN1, values.benefitN2, values.benefitN3];
      arr2 = [...arr2, values.benefit2N1, values.benefit2N2, values.benefit2N3];
      arr3 = [...arr3, values.benefit3N1, values.benefit3N2, values.benefit3N3];
      arr4 = [...arr4, values.benefit4N1, values.benefit4N2, values.benefit4N3];

      let variantsArray = [{
        "coverFile": coverNft,
        "indexInProject": 0,
        "name": obj.name,
        "price": Number(obj.price),
        "supply": Number(obj.supply),
        "utilities": arr1.filter((e) => e)
      }];

      if (nftNum > 1) {
        variantsArray.push({
          "coverFile": coverNft2,
          "indexInProject": 1,
          "name": obj.name2,
          "price": Number(obj.price2),
          "supply": Number(obj.supply2),
          "utilities": arr2.filter((e) => e)
        })
      }
      if (nftNum > 2) {
        variantsArray.push({
          "coverFile": coverNft3,
          "indexInProject": 2,
          "name": obj.name3,
          "price": Number(obj.price3),
          "supply": Number(obj.supply3),
          "utilities": arr3.filter((e) => e)
        })
      }
      if (nftNum > 3) {
        variantsArray.push({
          "coverFile": coverNft4,
          "indexInProject": 3,
          "name": obj.name4,
          "price": Number(obj.price4),
          "supply": Number(obj.supply4),
          "utilities": arr4.filter((e) => e)
        })
      }

      const payload = {
        coverFile: cover,
        name: obj.project,
        description: obj.desc,
        videoURL: obj.vurl,
        videoDesc: obj.vdesc,
        variants: variantsArray
      };
      console.log("Payload: ", payload);

      // projectCreated({
      //   coverUrl: "https://www.supercars.net/blog/wp-content/uploads/2020/09/wallpaperflare.com_wallpaper-1-1.jpg",
      //   nickName: "nick name",
      //   projectName: payload.name
      // });
      // NotificationManager.success("Project created!");

      if ((payload.variants.length === 1 && coverNft !== null) || (payload.variants.length === 2 && (coverNft !== null && coverNft2 !== null)) || (payload.variants.length === 3 && (coverNft !== null && coverNft2 !== null && coverNft3 !== null)) || (payload.variants.length === 4 && (coverNft !== null && coverNft2 !== null && coverNft3 !== null && coverNft4 !== null))) {
        setIsLoading(true);

        const result = await createProject({
          variables: payload
        });
        console.log("Submitted data result.", result);

        if (result) {
          projectCreated({
            coverUrl: result.data.createProject.coverUrl,
            nickName: result.data.createProject.artist.nickname,
            projectName: result.data.createProject.name
          });
          NotificationManager.success("Project created!");
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

          benefit2N1: "",
          benefit2N2: "",
          benefit2N3: "",
          benefit2Length: 1,
          benefits2: [],

          benefit3N1: "",
          benefit3N2: "",
          benefit3N3: "",
          benefit3Length: 1,
          benefits3: [],

          benefit4N1: "",
          benefit4N2: "",
          benefit4N3: "",
          benefit4Length: 1,
          benefits4: [],

          showPassword: false,
        });
        setCover(null);
        setCoverNft(null);
        setCoverNft2(null);
        setCoverNft3(null);
        setCoverNft4(null);
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
      project: "",
      desc: "",
      vurl: "",
      vdesc: "",
    }, // a record-level validation function to check all form values
  });

  const project = useField("project", form);
  const desc = useField("desc", form);

  const vurl = useField("vurl", form);
  const vdesc = useField("vdesc", form);

  const name = useField("name", form);
  const price = useField("price", form);
  const supply = useField("supply", form);

  const name2 = useField("name2", form);
  const price2 = useField("price2", form);
  const supply2 = useField("supply2", form);

  const name3 = useField("name3", form);
  const price3 = useField("price3", form);
  const supply3 = useField("supply3", form);

  const name4 = useField("name4", form);
  const price4 = useField("price4", form);
  const supply4 = useField("supply4", form);

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        Create project
      </BootstrapDialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Stack spacing={3}>
            <Stack spacing={3}>
              <Stack spacing={2} direction="row" justifyContent="center">
                <div>
                  <DropZone fileTypes={["JPG", "JPEG", "PNG", "GIF"]} multiple={false} handleChange={handleChangeFile}>
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
                    label: "Project name",
                    props: { ...project.input },
                    meta: { ...project.meta },
                  },
                  {
                    label: "Description",
                    props: { ...desc.input },
                    meta: { ...desc.meta },
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
                    multiline={
                      input.label === "Description" ? true : false
                    }
                    rows={input.label === "Description" ? 3 : 1}
                    maxRows={5}
                    label={input?.label}
                    type={"text"}
                    {...input.props}
                    style={{
                      width: "100%",
                      // backgroundImage: "linear-gradient(to right, transparent 10px, transparent 10px), linear-gradient(to left, transparent 10px, transparent 10px), repeating-linear-gradient(transparent, transparent 30px, red 30px, red 31px, white 31px)"
                    }}
                  />
                ))}
              </Stack>
              <Stack spacing={2}>
                {[
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
                    multiline={input.label === "Video Desc (optional)" ? true : false}
                    maxRows={5}
                    label={input?.label}
                    type={"text"}
                    {...input.props}
                  />
                ))}
              </Stack>
            </Stack>
            <Stack spacing={3}>
              <Typography color="white" fontSize={14} fontStyle="SemiBold">
                {"NFT"}
              </Typography>

              <Stack spacing={3}>
                <Typography
                  color="white"
                  fontSize={{ xs: 14, sm: 16 }}
                  fontWeight="400"
                >
                  1/4
                </Typography>
                <Stack spacing={3} direction="row" sx={{ display: { xs: 'block', md: 'flex' } }}>
                  <div>
                    <DropZone fileTypes={["JPG", "JPEG", "PNG", "GIF"]} multiple={false} handleChange={handleChangeFileNft}>
                      <Stack
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                        sx={{
                          width: "215px",
                          height: "215px",
                          padding: "5px",
                          border: (submit && !coverNft) ? "1px dashed #DE350B" : "1px dashed rgba(255, 255, 255, 0.2)",
                          borderRadius: "4px",
                        }}
                      >
                        {coverNftImage ? (
                          <img width="100%" height="100%" src={coverNftImage} alt="cover-img" style={{ objectFit: "cover" }}/>
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
                    {(coverNft === null && submit) && <FormHelperText id="component-error-text" style={{ color: "#DE350B" }}>Required</FormHelperText>}
                  </div>
                  <Stack spacing={1} sx={{ ml: { xs: "0 !important", md: '24px !important' } }}>
                    {[
                      {
                        label: "Name",
                        props: { ...name.input },
                        meta: { ...name.meta },
                      },
                      {
                        label: "Price EUR",
                        props: {
                          type: "number",
                          InputProps: {
                            inputProps: { max: 999999 }
                          },
                          ...price.input
                        },
                        meta: { ...price.meta },
                      },
                      {
                        label: "Supply",
                        props: {
                          type: "number",
                          ...supply.input
                        },
                        meta: { ...supply.meta },
                      },
                    ].map((input, i) => (
                      <AppTextField
                        key={i}
                        error={
                          input.meta.submitFailed && input.meta.error
                        }
                        type="text"
                        variant="standard"
                        helperText={
                          input.meta.submitFailed &&
                          input.meta.error &&
                          input.meta.error
                        }
                        label={input?.label}
                        {...input.props}
                      />
                    ))}
                  </Stack>
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

              {nftNum > 1 && <Stack spacing={3}>
                <Typography
                  color="white"
                  fontSize={{ xs: 14, sm: 16 }}
                  fontWeight="400"
                >
                  2/4
                </Typography>
                <Stack spacing={3} direction="row">
                  <div>
                    <DropZone fileTypes={["JPG", "JPEG", "PNG", "GIF"]} multiple={false} handleChange={handleChangeFileNft2}>
                      <Stack
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                        sx={{
                          width: "215px",
                          height: "215px",
                          padding: "5px",
                          border: (submit && !coverNft2) ? "1px dashed #DE350B" : "1px dashed rgba(255, 255, 255, 0.2)",
                          borderRadius: "4px",
                        }}
                      >
                        {coverNft2Image ? (
                          <img width="100%" height="100%" src={coverNft2Image} alt="cover-img" style={{ objectFit: "cover" }}/>
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
                    {(coverNft2 === null && submit) && <FormHelperText id="component-error-text" style={{ color: "#DE350B" }}>Required</FormHelperText>}
                  </div>
                  <Stack spacing={1}>
                    {[
                      {
                        label: "Name",
                        props: { ...name2.input },
                        meta: { ...name2.meta },
                      },
                      {
                        label: "Price",
                        props: {
                          type: "number",
                          ...price2.input
                        },
                        meta: { ...price2.meta },
                      },
                      {
                        label: "Supply",
                        props: {
                          type: "number",
                          ...supply2.input
                        },
                        meta: { ...supply2.meta },
                      },
                    ].map((input, i) => (
                      <AppTextField
                        key={i}
                        error={
                          input.meta.submitFailed && input.meta.error
                        }
                        variant="standard"
                        helperText={
                          input.meta.submitFailed &&
                          input.meta.error &&
                          input.meta.error
                        }
                        multiline={
                          input.label === "Description" ? true : false
                        }
                        maxRows={5}
                        label={input?.label}
                        type={"text"}
                        {...input.props}
                      />
                    ))}
                  </Stack>
                </Stack>
                <FormControl
                  sx={{ m: 1, width: "100%" }}
                  variant="standard"
                  error={values.benefit2N1 === "" && submit}
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
                    value={values.benefit2N1}
                    required
                    onChange={handleBenefitsChange("benefit2N1")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle benefits visibility"
                          onClick={handleClickAddBenefit2}
                        >
                          {values.benefit2Length === 1 ? (
                            <ControlPointIcon />
                          ) : (
                            null
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {(values.benefit2N1 === "" && submit) && <FormHelperText id="component-error-text">Required</FormHelperText>}
                </FormControl>

                {values.benefit2Length > 1 && <FormControl
                  sx={{ m: 1, width: "100%" }}
                  variant="standard"
                  error={values.benefit2N2 === "" && submit}
                >
                  <InputLabel
                    htmlFor="standard-adornment-benefit2N2"
                    sx={{ fontSize: "12px" }}
                  >
                    Benefits
                  </InputLabel>
                  <Input
                    id="standard-adornment-benefit2N2"
                    type={"text"}
                    value={values.benefit2N2}
                    required
                    onChange={handleBenefitsChange("benefit2N2")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle benefit2N2 visibility"
                          onClick={handleClickAddBenefit2}
                        >
                          {values.benefit2Length === 2 ? (
                            <ControlPointIcon />
                          ) : (
                            null
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {(values.benefit2N2 === "" && submit) && <FormHelperText id="component-error-text">Required</FormHelperText>}
                </FormControl>}

                {values.benefit2Length > 2 && <FormControl
                  sx={{ m: 1, width: "100%" }}
                  variant="standard"
                  error={values.benefit2N3 === "" && submit}
                >
                  <InputLabel
                    htmlFor="standard-adornment-benefit2N3"
                    sx={{ fontSize: "12px" }}
                  >
                    Benefits
                  </InputLabel>
                  <Input
                    id="standard-adornment-benefit2N3"
                    type={"text"}
                    value={values.benefit2N3}
                    required
                    onChange={handleBenefitsChange("benefit2N3")}
                  />
                  {(values.benefit2N3 === "" && submit) && <FormHelperText id="component-error-text">Required</FormHelperText>}
                </FormControl>}
              </Stack>}

              {nftNum > 2 && <Stack spacing={3}>
                <Typography
                  color="white"
                  fontSize={{ xs: 14, sm: 16 }}
                  fontWeight="400"
                >
                  3/4
                </Typography>
                <Stack spacing={3} direction="row">
                  <div>
                    <DropZone fileTypes={["JPG", "JPEG", "PNG", "GIF"]} multiple={false} handleChange={handleChangeFileNft3}>
                      <Stack
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                        sx={{
                          width: "215px",
                          height: "215px",
                          padding: "5px",
                          border: (submit && !coverNft3) ? "1px dashed #DE350B" : "1px dashed rgba(255, 255, 255, 0.2)",
                          borderRadius: "4px",
                        }}
                      >
                        {coverNft3Image ? (
                          <img width="100%" height="100%" src={coverNft3Image} alt="cover-img" style={{ objectFit: "cover" }}/>
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
                    {(coverNft3 === null && submit) && <FormHelperText id="component-error-text" style={{ color: "#DE350B" }}>Required</FormHelperText>}
                  </div>
                  <Stack spacing={1}>
                    {[
                      {
                        label: "Name",
                        props: { ...name3.input },
                        meta: { ...name3.meta },
                      },
                      {
                        label: "Price",
                        props: {
                          type: "number",
                          ...price3.input
                        },
                        meta: { ...price3.meta },
                      },
                      {
                        label: "Supply",
                        props: {
                          type: "number",
                          ...supply3.input
                        },
                        meta: { ...supply3.meta },
                      },
                    ].map((input, i) => (
                      <AppTextField
                        key={i}
                        error={
                          input.meta.submitFailed && input.meta.error
                        }
                        variant="standard"
                        helperText={
                          input.meta.submitFailed &&
                          input.meta.error &&
                          input.meta.error
                        }
                        multiline={
                          input.label === "Description" ? true : false
                        }
                        maxRows={5}
                        label={input?.label}
                        type={"text"}
                        {...input.props}
                      />
                    ))}
                  </Stack>
                </Stack>
                <FormControl
                  sx={{ m: 1, width: "100%" }}
                  variant="standard"
                  error={values.benefit3N1 === "" && submit}
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
                    value={values.benefit3N1}
                    required
                    onChange={handleBenefitsChange("benefit3N1")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle benefits visibility"
                          onClick={handleClickAddBenefit3}
                        >
                          {values.benefit3Length === 1 ? (
                            <ControlPointIcon />
                          ) : (
                            null
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {(values.benefit3N1 === "" && submit) && <FormHelperText id="component-error-text">Required</FormHelperText>}
                </FormControl>

                {values.benefit3Length > 1 && <FormControl
                  sx={{ m: 1, width: "100%" }}
                  variant="standard"
                  error={values.benefit3N2 === "" && submit}
                >
                  <InputLabel
                    htmlFor="standard-adornment-benefit3N2"
                    sx={{ fontSize: "12px" }}
                  >
                    Benefits
                  </InputLabel>
                  <Input
                    id="standard-adornment-benefit3N2"
                    type={"text"}
                    value={values.benefit3N2}
                    required
                    onChange={handleBenefitsChange("benefit3N2")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle benefit3N2 visibility"
                          onClick={handleClickAddBenefit3}
                        >
                          {values.benefit3Length === 2 ? (
                            <ControlPointIcon />
                          ) : (
                            null
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {(values.benefit3N2 === "" && submit) && <FormHelperText id="component-error-text">Required</FormHelperText>}
                </FormControl>}

                {values.benefit3Length > 2 && <FormControl
                  sx={{ m: 1, width: "100%" }}
                  variant="standard"
                  error={values.benefit3N3 === "" && submit}
                >
                  <InputLabel
                    htmlFor="standard-adornment-benefit3N3"
                    sx={{ fontSize: "12px" }}
                  >
                    Benefits
                  </InputLabel>
                  <Input
                    id="standard-adornment-benefit3N3"
                    type={"text"}
                    value={values.benefit3N3}
                    required
                    onChange={handleBenefitsChange("benefit3N3")}
                  />
                  {(values.benefit3N3 === "" && submit) && <FormHelperText id="component-error-text">Required</FormHelperText>}
                </FormControl>}
              </Stack>}

              {nftNum > 3 && <Stack spacing={3}>
                <Typography
                  color="white"
                  fontSize={{ xs: 14, sm: 16 }}
                  fontWeight="400"
                >
                  4/4
                </Typography>
                <Stack spacing={3} direction="row">
                  <div>
                    <DropZone fileTypes={["JPG", "JPEG", "PNG", "GIF"]} multiple={false} handleChange={handleChangeFileNft4}>
                      <Stack
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                        sx={{
                          width: "215px",
                          height: "215px",
                          padding: "5px",
                          border: (submit && !coverNft4) ? "1px dashed #DE350B" : "1px dashed rgba(255, 255, 255, 0.2)",
                          borderRadius: "4px",
                        }}
                      >
                        {coverNft4Image ? (
                          <img width="100%" height="100%" src={coverNft4Image} alt="cover-img" style={{ objectFit: "cover" }}/>
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
                    {(coverNft4 === null && submit) && <FormHelperText id="component-error-text" style={{ color: "#DE350B" }}>Required</FormHelperText>}
                  </div>
                  <Stack spacing={1}>
                    {[
                      {
                        label: "Name",
                        props: { ...name4.input },
                        meta: { ...name4.meta },
                      },
                      {
                        label: "Price",
                        props: {
                          type: "number",
                          ...price4.input
                        },
                        meta: { ...price4.meta },
                      },
                      {
                        label: "Supply",
                        props: {
                          type: "number",
                          ...supply4.input
                        },
                        meta: { ...supply4.meta },
                      },
                    ].map((input, i) => (
                      <AppTextField
                        key={i}
                        error={
                          input.meta.submitFailed && input.meta.error
                        }
                        variant="standard"
                        helperText={
                          input.meta.submitFailed &&
                          input.meta.error &&
                          input.meta.error
                        }
                        multiline={
                          input.label === "Description" ? true : false
                        }
                        maxRows={5}
                        label={input?.label}
                        type={"text"}
                        {...input.props}
                      />
                    ))}
                  </Stack>
                </Stack>
                <FormControl
                  sx={{ m: 1, width: "100%" }}
                  variant="standard"
                  error={values.benefit4N1 === "" && submit}
                >
                  <InputLabel
                    htmlFor="standard-adornment-benefit4"
                    sx={{ fontSize: "12px" }}
                  >
                    Benefits
                  </InputLabel>
                  <Input
                    id="standard-adornment-benefit4"
                    type={"text"}
                    value={values.benefit4N1}
                    required
                    onChange={handleBenefitsChange("benefit4N1")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle benefits4 visibility"
                          onClick={handleClickAddBenefit4}
                        >
                          {values.benefit4Length === 1 ? (
                            <ControlPointIcon />
                          ) : (
                            null
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {(values.benefit4N1 === "" && submit) && <FormHelperText id="component-error-text">Required</FormHelperText>}
                </FormControl>

                {values.benefit4Length > 1 && <FormControl
                  sx={{ m: 1, width: "100%" }}
                  variant="standard"
                  error={values.benefit4N2 === "" && submit}
                >
                  <InputLabel
                    htmlFor="standard-adornment-benefit4N2"
                    sx={{ fontSize: "12px" }}
                  >
                    Benefits
                  </InputLabel>
                  <Input
                    id="standard-adornment-benefit4N2"
                    type={"text"}
                    value={values.benefit4N2}
                    required
                    onChange={handleBenefitsChange("benefit4N2")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle benefit4N2 visibility"
                          onClick={handleClickAddBenefit4}
                        >
                          {values.benefit4Length === 2 ? (
                            <ControlPointIcon />
                          ) : (
                            null
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {(values.benefit4N2 === "" && submit) && <FormHelperText id="component-error-text">Required</FormHelperText>}
                </FormControl>}

                {values.benefit4Length > 2 && <FormControl
                  sx={{ m: 1, width: "100%" }}
                  variant="standard"
                  error={values.benefit4N3 === "" && submit}
                >
                  <InputLabel
                    htmlFor="standard-adornment-benefit4N3"
                    sx={{ fontSize: "12px" }}
                  >
                    Benefits
                  </InputLabel>
                  <Input
                    id="standard-adornment-benefit4N3"
                    type={"text"}
                    value={values.benefit4N3}
                    required
                    onChange={handleBenefitsChange("benefit4N3")}
                  />
                  {(values.benefit4N3 === "" && submit) && <FormHelperText id="component-error-text">Required</FormHelperText>}
                </FormControl>}
              </Stack>}

              {nftNum < 4 && <Stack alignItems={"start"}>
                <Button
                  onClick={handleAnotherNftAdd}
                  size="small"
                  sx={{
                    marginTop: "24px",
                    fontSize: "14px",
                    background: "#24282C",
                    border: "1px solid #343944;",
                    boxSizing: "border-box;",
                    borderRadius: "32px;",
                    color: "rgba(255, 255, 255, 0.8);",
                  }}
                >
                  {"Add another NFT"}
                </Button>
              </Stack>}
            </Stack>
          </Stack>
          <Stack alignItems="end" marginTop={"24px"}>
            <ButtonGradient
              fullWidth={mediumViewport && true}
              loading={isLoading}
              label={"Create"}
              onClick={() => preHandleSubmit()}
            />
          </Stack>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
};
