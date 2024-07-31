import { dictionaryList } from "./language/index";
const defaultLanguage = "en";

const messages = dictionaryList[defaultLanguage].errors;

// global regex
const noHtmlRegex = /<\/?[^>]+(>|$)/g;
const onlyAlphbetRegex = /^[a-zA-Z ]*$/;
const numberOnly = /^\d+$/;
var phoneRegex = /^[0-9]+$/;
var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const unitRegex = /^[0-9]+\.?[0-9]*$/;

const checkEmail = (value) => {
  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
  ) {
    return true;
  } else if (value.includes('"') || value.includes("'") || value.includes(",") || value.includes(" ")) {
    return true;
  } else {
    return false;
  }
};

export const loginValidator = (values) => {
  let errors = {};
  console.log(values);

  // if (!values.mobile_number) {
  //     errors.mobile_number = "Enter mobile number";
  // } else if (!phoneRegex.test(values.mobile_number)) {
  //     errors.mobile_number = messages.phone;
  // } else if (values.mobile_number.length < 4) {
  //     errors.mobile_number = messages.phone;
  // }

  if (!values.password) {
    errors.password = "Enter Password";
  }

  if (!values.email) {
    errors.email = "Enter Email ID";
  } else if (checkEmail(values.email)) {
    errors.email = messages.email;
  }

  return errors;
};

export const forgetValidator = (values) => {
  let errors = {};
  if (!values.mobile_number) {
    errors.phone = messages.invalid;
  } else if (!phoneRegex.test(values.mobile_number)) {
    errors.phone = messages.phone;
  } else if (values.mobile_number.length < 4) {
    errors.phone = messages.phone;
  }

  return errors;
};

export const otpValidator = (values) => {
  let errors = {};

  if (values.verification_code.length < 4) {
    errors.verification_code = messages.otp;
  }
  if (!values.verification_code) {
    errors.verification_code = "Please enter valid OTP";
  }
  return errors;
};

export const resetOutValidator = (values) => {
  let errors = {};

  if (!values.password) {
    errors.password = messages.invalid;
  } else if (!passwordRegex.test(values.password)) {
    errors.password = messages.password;
  } else if (values.password.length < 8) {
    errors.password = messages.password;
  }
  if (!values.confirm_password) {
    errors.confirm_password = messages.invalid;
  } else if (values.password !== values.confirm_password) {
    errors.confirm_password = messages.passwordMatch;
  }

  return errors;
};

export const signUpValidator = (values) => {
  console.log(values);
  let errors = {};
  if (!values.username.trim()) {
    errors.username = "Enter Supermarket name";
  } else if (!onlyAlphbetRegex.test(values.username)) {
    errors.username = messages.invalid;
  }

  if (!values.mobile_number) {
    errors.mobile_number = "Enter mobile number ";
  } else if (!phoneRegex.test(values.mobile_number)) {
    errors.mobile_number = messages.phone;
  } else if (values.mobile_number.length < 4) {
    errors.mobile_number = messages.phone;
  }

  if (!values.email) {
    errors.email = "Enter Email ID";
  } else if (checkEmail(values.email)) {
    errors.email = messages.email;
  }
  if (!values.password) {
    errors.password = "Enter password";
  } else if (!passwordRegex.test(values.password)) {
    errors.password = messages.password;
  }

  if (!values.confirm_password) {
    errors.confirm_password = "Enter confirm password";
  } else if (values.password !== values.confirm_password) {
    errors.confirm_password = messages.passwordMatch;
  }

  // if (!values.terms_check) {
  //   errors.terms_check = "Please select terms and conditions";
  // }

  return errors;
};

export const completeProfileValidator = (values) => {
  let errors = {};
  // console.log(values);
  if (!values.username) {
    errors.username = messages.invalid;
  }
  if (!values.mobile_number) {
    errors.mobile_number = messages.invalid;
  } else if (!phoneRegex.test(values.mobile_number)) {
    errors.mobile_number = messages.phone;
  } else if (values.mobile_number.length < 4) {
    errors.mobile_number = messages.phone;
  }
  if (!values.email) {
    errors.email = messages.invalid;
  }
  if (!values.profile_image[0]) {
    errors.profile_image = "Upload profile image";
  }
  return errors;
};

export const bankDetailsValidator = (values) => {
  let errors = {};
  console.log(values);
  if (!values.account_holder_name) {
    errors.account_holder_name = messages.invalid;
  } else if (!onlyAlphbetRegex.test(values.account_holder_name)) {
    errors.account_holder_name = "It's only accept letters";
  }
  if (!values.account_number) {
    errors.account_number = messages.invalid;
  } else if (values.account_number.length >= 20) {
    errors.account_number = "Incorrect Account Number";
  } else if (!phoneRegex.test(values.account_number)) {
    errors.account_number = "Incorrect Account Number";
  }
  if (!values.re_account_number) {
    errors.re_account_number = messages.invalid;
  } else if (values.account_number !== values.re_account_number) {
    errors.re_account_number = messages.accountMatch;
  }
  if (!values.re_account_number) {
    errors.re_account_number = messages.invalid;
  }
  if (!values.ifsc) {
    errors.ifsc = messages.invalid;
  }
  if (!values.bank_name) {
    errors.bank_name = messages.invalid;
  }

  return errors;
};

export const menuValidator = (values) => {
  let errors = {};
  if (!values.menu_title) {
    errors.menu_title = messages.invalid;
  }
  return errors;
};

export const dishValidator = (values) => {
  let errors = {};
  if (!values.dish_name) {
    errors.dish_name = messages.invalid;
  }
  if (!values.search_keywords) {
    errors.search_keywords = messages.invalid;
  }
  if (values.search_keywords.length < 1) {
    errors.search_keywords = messages.invalid;
  }
  if (!values.serving_size) {
    errors.serving_size = messages.invalid;
  }
  if (values.serving_size.length < 1) {
    errors.serving_size = messages.invalid;
  }
  if (!values.minimum_preparation_time) {
    errors.minimum_preparation_time = messages.invalid;
  }
  if (values.minimum_preparation_time.length > 3) {
    errors.minimum_preparation_time = "Please enter value less than 999";
  }
  if (!values.dish_price) {
    errors.dish_price = messages.invalid;
  }
  if (!values.dish_type) {
    errors.dish_type = messages.invalid;
  }
  if (values.dish_type.length < 1) {
    errors.dish_type = messages.invalid;
  }
  if (!values.dish_status) {
    errors.dish_status = messages.invalid;
  }
  if (values.dish_status.length < 1) {
    errors.dish_status = messages.invalid;
  }
  if (!values.description) {
    errors.description = messages.invalid;
  }
  if (!values.dish_images) {
    errors.dish_images = messages.invalid;
  }
  if (values.dish_images.length < 1) {
    errors.dish_images = messages.invalid;
  }
  return errors;
};

export const restaurantDetailsValidator = (values) => {
  let errors = {};
  // console.log(values);
  if (!values.restaurant_images) {
    errors.restaurant_images = messages.invalid;
  }
  if (values.restaurant_images.length < 1) {
    errors.restaurant_images = messages.imagesLength;
  }
  if (!values.restaurant_name) {
    errors.restaurant_name = messages.invalid;
  }
  if (!values.mobile_number) {
    errors.mobile_number = messages.invalid;
  } else if (!phoneRegex.test(values.mobile_number)) {
    errors.mobile_number = messages.phone;
  } else if (values.mobile_number.length < 4) {
    errors.mobile_number = messages.phone;
  }
  if (!values.restaurant_location) {
    errors.restaurant_location = messages.invalid;
  }
  if (!values.email) {
    errors.email = messages.invalid;
  }
  if (!values.upload_first) {
    errors.upload_first = messages.invalid;
  }
  if (values.upload_first.length < 1) {
    errors.upload_first = messages.imagesLength;
  }
  if (values.categories.length < 1) {
    errors.categories = messages.invalid;
  }
  if (!values.service_type) {
    errors.service_type = messages.invalid;
  }
  if (values.service_type == 2 || values.service_type == 3) {
    if (!values.self_pickup_time) {
      errors.self_pickup_time = "Please select self pickup time";
    }
  }
  // if (!values.upload_second) {
  //   errors.upload_second = messages.invalid;
  // }
  // if (values.upload_second.length < 1) {
  //   errors.upload_second = messages.imagesLength;
  // }
  {
    values.working_hours.map((item, index) => {
      if (item.is_holyday == true ? !item.start_time || !item.end_time : "") {
        errors.working_hours = messages.selectStartEndTime;
      }
      if (!errors.working_hours) {
        if (item.is_holyday == true ? item.start_time == item.end_time : "") {
          errors.working_hours = messages.startEndTime;
        }
      }
      if (!errors.working_hours) {
        if (item.is_holyday == true ? item.start_time >= item.end_time : "") {
          errors.working_hours = "Start time should be greater than end time";
        }
      }
    });
  }

  // console.log(errors);

  return errors;
};

export const passwordProfileValidator = (values) => {
  let errors = {};

  if (!values.oldPassword) {
    errors.oldPassword = messages.invalid;
  }
  if (!values.password) {
    errors.password = messages.invalid;
  }
  // else if (
  //   !passwordRegex.test(
  //     values.password
  //   )
  // ) {
  //   errors.password = messages.password;
  // }

  if (!values.confirmPassword) {
    errors.confirmPassword = messages.invalid;
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = messages.passwordMatch;
  }

  // console.log(errors);

  return errors;
};

export const offerValidator = (values) => {
  let errors = {};

  // console.log(values);

  if (!values.offer_type) {
    errors.offer_type = messages.invalid;
  }
  if (!values.offer_name) {
    errors.offer_name = messages.invalid;
  }

  if (!values.offer_code) {
    errors.offer_code = messages.invalid;
  }

  if (!values.offer_validity.from) {
    errors.offer_validityfrom = messages.invalid;
  }

  if (!values.offer_validity.to) {
    errors.offer_validityto = messages.invalid;
  }

  if (!values.min_amount) {
    errors.min_amount = messages.invalid;
  }

  if (!values.max_amount) {
    errors.max_amount = messages.invalid;
  }

  // console.log(errors);

  return errors;
};

export const branchValidator = (values) => {
  let errors = {};

  console.log(values);

  if (!values.branchId) {
    errors.branchId = "Add branch ID";
  }
  if (values.branchId.trim() === "") {
    errors.branchId = "Add branch ID";
  }
  if (!values.name) {
    errors.name = "Add branch name";
  }
  if (values.name.trim() === "") {
    errors.name = "Add branch name";
  }

  if (!values.address) {
    errors.address = "Add address";
  }
  if (values.address.trim() === "") {
    errors.address = "Add address";
  }

  if (!values.opening_time) {
    errors.opening_time = "Add opening time";
  }

  if (!values.store_radius) {
    errors.store_radius = "Add store radius";
  }

  if (!values.closing_time) {
    errors.closing_time = "Add closing time ";
  } else if (values.closing_time == values.opening_time) {
    errors.closing_time = "Opening and closing time can't be same ";
  }
  if (!values.image[0]) {
    errors.image = "Upload image";
  }

  // if (!values.branch_category[0]) {
  //   errors.branch_category = "Add atleast one category";
  // }

  return errors;
};

export const managerValidator = (values) => {
  let errors = {};

  console.log(values);

  if (!values.manager_name) {
    errors.manager_name = "Add manager name";
  }
  if (values.manager_name.trim() === "") {
    errors.manager_name = "Add manager name";
  } else if (!onlyAlphbetRegex.test(values.manager_name)) {
    errors.manager_name = "It's only accept letters";
  }

  if (!values.email_id) {
    errors.email_id = "Add email-id";
  }
  if (values.email_id.trim() === "") {
    errors.email_id = "Add email-id";
  } else if (checkEmail(values.email_id)) {
    errors.email_id = messages.email;
  }

  if (!values.contact_number) {
    errors.contact_number = "Add Address";
  }

  if (!values.branch_name) {
    errors.branch_name = "Add branch name";
  }

  if (values.contact_number.trim() === "") {
    errors.contact_number = "Add Address";
  }

  if (!values.location) {
    errors.location = "Add location";
  }

  return errors;
};

export const subCategoryValidator = (values) => {
  let errors = {};

  if (!values.category) {
    errors.category = "Select category";
  }

  if (!values.subcategory_name) {
    errors.subcategory_name = "Add sub-category name";
  }

  if (values.subcategory_name.trim() === "") {
    errors.subcategory_name = "Add sub-category name";
  }

  return errors;
};

export const ProductValidator = (values) => {
  let errors = {};

  console.log(values);

  if (!values.product_name) {
    errors.product_name = "Add product name";
  }

  if (values.product_name.trim() === "") {
    errors.product_name = "Add product name";
  }

  if (!values.product_description) {
    errors.product_description = "Add product description";
  }

  if (values.product_description.trim() === "") {
    errors.product_description = "Add product description";
  }

  if (!values.barcode_number) {
    errors.barcode_number = "Add barcode number";
  }

  if (values.barcode_number.trim() === "") {
    errors.barcode_number = "Add barcode number";
  }
  if (!values.unit) {
    errors.unit = "Select unit";
  }
  if (!values.unit_measurement) {
    errors.unit_measurement = "Add unit measurement";
  } else if (!unitRegex.test(values.unit_measurement)) {
    errors.unit_measurement = "Incorrect Unit";
  }

  // if (!values.quantity) {
  //   errors.quantity = messages.invalid;
  // }

  // if (values.quantity < 1) {
  //   errors.quantity = "Quantity must be greater than 0";
  // }

  // if (values.quantity <= values.unit_measurement) {
  //   errors.quantity = "Quantity is not less than Unit Measurement";
  // }

  if (values.price < 1) {
    errors.price = "Price must be greater than 0";
  }

  if (!values.price) {
    errors.price = "Add price";
  }

  if (!values.selling_price) {
    errors.selling_price = "Add selling price";
  } else if (Number(values.selling_price) > Number(values.price)) {
    errors.selling_price = "Selling price should not greater than and equal to Product Price";

    // console.log(typeof values.price)
  }

  // if (!values.discount_price) {
  //   errors.discount_price = messages.invalid;
  // }

  if (!values.images[0]) {
    errors.images = "Upload images";
  }

  if (!values.category) {
    errors.category = "Select category";
  }

  if (!values.subCategory) {
    errors.subCategory = "Select sub-category";
  }

  return errors;
};

// export const offerValidator = (values) => {
//   let errors = {};

//   console.log(values);

//   if (!values.offer_code) {
//     errors.offer_code = messages.invalid;
//   }
//   if(values.offer_code.trim() === "") {
//     errors.offer_code = messages.invalid;
//   }
//   if (!values.discount_amount) {
//     errors.discount_amount = messages.invalid;
//   }
//   if (!values.limit) {
//     errors.limit = messages.invalid;
//   }

//   if (!values.maximum_discount) {
//     errors.maximum_discount = messages.invalid;
//   } else if (values.maximum_discount.length > 5) {
//     errors.maximum_discount = "Invalid amount";
//   }

//   if (!values.minimum_order_value) {
//     errors.minimum_order_value = messages.invalid;
//   } else if (values.minimum_order_value < 1) {
//     errors.minimum_order_value = "Price value can't be less than to 1";
//   }
//   if(values.discount_amount.trim() === "") {
//     errors.discount_amount = messages.invalid;
//   }

//   if (!values.discount_type) {
//     errors.discount_type = messages.invalid;
//   }
//   if (!values.maximum_discount) {
//     errors.maximum_discount = messages.invalid;
//   }
//   if (values.discount_type == "Percent") {
//     if (values.discount_amount > 98) {
//       errors.discount_amount = "Discount can't be more than 98";
//     }
//   }
//   if(values.discount_type.trim() === "") {
//     errors.discount_type = messages.invalid;
//   }

//   if (!values.description) {
//     errors.description = messages.invalid;
//   }
//   if(values.description.trim() === "") {
//     errors.description = messages.invalid;
//   }

//   if (!values.start_validity) {
//     errors.start_validity = messages.invalid;
//   }

//   if (!values.end_validity) {
//     errors.end_validity = messages.invalid;
//   }

//   return errors;
// };

export const agentDisapproveValidator = (values) => {
  let errors = {};

  if (values.bio_message.length > 40) {
    errors.bio_message = "Please use less than 40 characters";
  }
  if (values.address_message.length > 40) {
    errors.address_message = "Please use less than 40 characters";
  }
  if (values.license_message.length > 40) {
    errors.license_message = "Please use less than 40 characters";
  }
  if (values.website_message.length > 40) {
    errors.website_message = "Please use less than 40 characters";
  }
  if (values.business_since_message.length > 40) {
    errors.business_since_message = "Please use less than 40 characters";
  }
  if (values.language_fluency_message.length > 40) {
    errors.language_fluency_message = "Please use less than 40 characters";
  }
  if (values.blog_message.length > 40) {
    errors.blog_message = "Please use less than 40 characters";
  }
  if (values.facebook_message.length > 40) {
    errors.facebook_message = "Please use less than 40 characters";
  }
  if (values.linkedin_message.length > 40) {
    errors.linkedin_message = "Please use less than 40 characters";
  }

  return errors;
};

export const prescripValidator = (values) => {
  let errors = {};

  console.log(values);

  if (!values.name) {
    errors.name = messages.invalid;
  }

  if (!values.type) {
    errors.type = messages.invalid;
  }

  if (!values.amount) {
    errors.amount = messages.invalid;
  }

  if (!values.discount) {
    errors.discount = messages.invalid;
  }

  if (!values.month) {
    errors.month = messages.invalid;
  }

  if (values.feature1.length > 60) {
    errors.feature1 = "Please use less than 60 characters";
  }

  if (values.feature2.length > 60) {
    errors.feature2 = "Please use less than 60 characters";
  }

  if (values.feature3.length > 60) {
    errors.feature2 = "Please use less than 60 characters";
  }

  // if (!values.feature1) {
  //   errors.feature1 = messages.invalid;
  // }

  // if (!values.feature2) {
  //   errors.feature2 = messages.invalid;
  // }

  // if (!values.feature3) {
  //   errors.feature3 = messages.invalid;
  // }

  // console.log(errors);

  return errors;
};

export const deliveryBoyDataValidator = (values) => {
  let errors = {};
  if (!values.firstName) {
    errors.firstName = "Enter First Name";
  }
  if (!values.lastName) {
    errors.lastName = "Enter Last Name";
  }
  // if (!values.email) {
  //   errors.email = "Enter Email";
  // } else if (checkEmail(values.email)) {
  //   errors.email = messages.email;
  // }
  if (!values.password) {
    errors.password = "Enter password";
  }
  if (!values.mobileNum) {
    errors.mobile = "Enter Mobile Number";
  }

  return errors;
};
export const SubscriptionDataValidator = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Enter Plan Name";
  }

  if (!values.price) {
    errors.price = "Enter Price";
  }
  if (values.price) {
    // let regexprice = /[(0-9)+.?(0-9)*]+/gim;
    let regexprice = /^[0-9]+$/;

    if (!regexprice.test(String(values.price))) {
      errors.price = "Enter valid Price";
    }
  }
  if (!values.features) {
    errors.features = "Enter Features";
  }
  if (!values.planType) {
    errors.planType = "Select Plan Duration";
  }

  return errors;
};

export const disapproveValidator = (values) => {
  console.log(values);
  let errors = {};
  if (values.businessNameCheck == true) {
    if (!values.businessName) {
      errors.businessName = "Invalid";
    }
    if (values.businessName.length > 30) {
      errors.businessName = "Can't exceed more than 30 characters";
    }
  }

  if (values.businessNumberCheck == true) {
    if (!values.businessNumber) {
      errors.businessNumber = "Invalid";
    }
    if (values.businessNumber.length > 30) {
      errors.businessNumber = "Can't exceed more than 30 characters";
    }
  }
  if (values.bannerImageCheck == true) {
    if (!values.bannerImage) {
      errors.bannerImage = "Invalid";
    }
    if (values.bannerImage.length > 30) {
      errors.bannerImage = "Can't exceed more than 30 characters";
    }
  }
  if (values.websiteCheck == true) {
    if (!values.website) {
      errors.website = "Invalid";
    }
    if (values.website.length > 30) {
      errors.website = "Can't exceed more than 30 characters";
    }
  }
  if (values.postcodeCheck == true) {
    if (!values.postcode) {
      errors.postcode = "Invalid";
    }
    if (values.postcode.length > 30) {
      errors.postcode = "Can't exceed more than 30 characters";
    }
  }
  if (values.shopInformationCheck == true) {
    if (!values.shopInformation) {
      errors.shopInformation = "Invalid";
    }
    if (values.shopInformation.length > 30) {
      errors.shopInformation = "Can't exceed more than 30 characters";
    }
  }
  if (values.shopTimingCheck == true) {
    if (!values.shopTiming) {
      errors.shopTiming = "Invalid";
    }
    if (values.shopTiming.length > 30) {
      errors.shopTiming = "Can't exceed more than 30 characters";
    }
  }
  if (values.addressCheck == true) {
    if (!values.address) {
      errors.address = "Invalid";
    }
    if (values.address.length > 30) {
      errors.address = "Can't exceed more than 30 characters";
    }
  }
  if (values.Image1Check == true) {
    if (!values.Image1) {
      errors.Image1 = "Invalid";
    }
    if (values.Image1.length > 30) {
      errors.Image1 = "Can't exceed more than 30 characters";
    }
  }
  if (values.Image2Check == true) {
    if (!values.Image2) {
      errors.Image2 = "Invalid";
    }
    if (values.Image2.length > 30) {
      errors.Image2 = "Can't exceed more than 30 characters";
    }
  }
  if (values.Image3Check == true) {
    if (!values.Image3) {
      errors.Image3 = "Invalid";
    }
    if (values.Image3.length > 30) {
      errors.Image3 = "Can't exceed more than 30 characters";
    }
  }
  if (values.Image4Check == true) {
    if (!values.Image4) {
      errors.Image4 = "Invalid";
    }
    if (values.Image4.length > 30) {
      errors.Image4 = "Can't exceed more than 30 characters";
    }
  }
  if (values.Image5Check == true) {
    if (!values.Image5) {
      errors.Image5 = "Invalid";
    }
    if (values.Image5.length > 30) {
      errors.Image5 = "Can't exceed more than 30 characters";
    }
  }
  if (values.Image6Check == true) {
    if (!values.Image6) {
      errors.Image6 = "Invalid";
    }
    if (values.Image6.length > 30) {
      errors.Image6 = "Can't exceed more than 30 characters";
    }
  }
  if (values.Image7Check == true) {
    if (!values.Image7) {
      errors.Image7 = "Invalid";
    }
    if (values.Image7.length > 30) {
      errors.Image7 = "Can't exceed more than 30 characters";
    }
  }
  if (values.Image8Check == true) {
    if (!values.Image8) {
      errors.Image8 = "Invalid";
    }
    if (values.Image8.length > 30) {
      errors.Image8 = "Can't exceed more than 30 characters";
    }
  }
  return errors;
};
