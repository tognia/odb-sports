import { Form, Input, Button, Layout, Select, notification, Card } from "antd";
import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import countryList from "react-select-country-list";
import { useTranslation } from "react-i18next";

import { storage } from '../../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { DefaultTeamLogo } from "../../../data/defaultTeamLogo";
import { useGlobalStateCompetition } from "../../../context/CompetitionProvider";
import { useGlobalStateShowDrawer } from "../../../context/showDrawerProvider";
import { FileImageOutlined } from "@ant-design/icons";
import { Types } from '../../../context/CompetitionReducer';

const { Content } = Layout;
const { Option } = Select;

let key = 'New Comptetition';


const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 17 },
};




const Root = () => {

  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [defaultCountry] = useState("cm");



  const [nameCompetition, setNameCompetition] = useState<string>("");
  const [genderCompetition, setGender] = useState<string>("m"); 
  const [typeCompetition, setType] = useState<string>("club");
  const [countryCompetition, setCountry] = useState<string>("cm");
  const [countryNameCompetition, setCountryNameCompetition] = useState<string>("Cameroun");
  const [ima, setIma] = useState<File>();
  const [imgUrl, setImgUrl] = useState("");

  const [selectedImage, setSelectedImage] = useState<any>();

  const { stateCompetition, dispatch, setLoadCompetition } = useGlobalStateCompetition();
  const { setStateShowDrawer } = useGlobalStateShowDrawer();





  const options = useMemo(() => countryList().getData(), []);
  const { id } = useParams();


  ////////////////////   Functions For Select options in the form  ///////////////////////////////

  function handleChangeName (e: React.ChangeEvent<HTMLInputElement>) {
    setNameCompetition( e.target.value);
  }
    
  function handleChangeGender (value: string)  {
    
    setGender( value );
  };
  function handleChangeType (value: string)  {
    
    setType( value );
  };
  function handleChangeCountry (value: string)  {
      const searchCountry = Object.keys(options).find(
      (ctry:any) => options[ctry]!.value === value
    );    

      setCountry( value );
      setCountryNameCompetition(options[Number(searchCountry)].label);

   
  };

   ////////////////////  End Functions For Select options in the form  ///////////////////////////////

  ////////////////////////////  SAVE THE COMPETITION /////////////////////////////////////////////////


  const handleSubmit = (e:any) => {
    e.preventDefault();
    const file = ima;
    if (!file)
    {

       if(id !== undefined){
        
       }

       else {

        dispatch({
            type: Types.addCompetition,
            payload: {
              name:nameCompetition,
              gender: genderCompetition,
              type : typeCompetition,
              countryCode : countryCompetition,
              countryName : countryNameCompetition,
              logo:DefaultTeamLogo,
            }
          });  

          setLoadCompetition(2);
          setStateShowDrawer(false);
          notification.open({
            key,
            message: "New Competition : "+nameCompetition+" added with success",
            description: '',
          });
        
        }               
    }

     else 

    {
    
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);       

    uploadTask.on("state_changed",
      (snapshot) => {
        
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);

          if(id !== undefined){
            
           } 
           else {


          dispatch({
            type: Types.addCompetition,
            payload: {
              name:nameCompetition,
              gender: genderCompetition,
              type : typeCompetition,
              countryCode : countryCompetition,
              countryName : countryNameCompetition,
              logo:downloadURL,
            }
          });  

              setLoadCompetition(2);
              setStateShowDrawer(false);
              notification.open({
                key,
                message: "New Competition : "+nameCompetition+" added with success",
                description: '',
              }); 
            }

        });


      }
    );
  
  }
  }

  /////////////////////////////////  END SAVE THE COMPETITION /////////////////////////

  const imageChange = (e:any) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setIma(e.target.files[0]);

    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };    




  useEffect(() => {
    if (id !== undefined) {
      const foundItem = stateCompetition.find((item: any)=>item.id===Number(id));

    
   
      setNameCompetition(foundItem!.name);
      setGender(foundItem!.gender);
      setCountry(foundItem!.countryCode);
      setType(foundItem!.type);
      setImgUrl(foundItem!.logo);

      form.setFieldsValue({
        competition: foundItem,
      });
    }
  }, [form]);

  const onSubmit = (values: any) => {

    setTimeout(() => {
      if (id !== undefined) {
      } else {
        form.setFieldsValue({
          competition: {
            name: "",
            logo: "",
            country: "CM",
            gender: "",
            type: "",
          },
        });
      }

    }, 3000);
  };
    

  return (
    <>
      

      <Content style={{ margin: "16px" }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
       
          
      
    <>
      <div>
        
        <label onChange={imageChange} htmlFor="formId"
            onClick={(e:any) =>{
              e.stopPropagation();               
              }}
          >
              <input name="" type="file" id="formId" hidden />       
                <a>
                UPLOAD IMAGE &nbsp;&nbsp;
                <FileImageOutlined width={"30em"} height={"30em"} />
                </a>
       </label>

        {(selectedImage||imgUrl) && (
          <div>
            <Card bordered={true} style={{ width: 300 }} className="compet_card">
                <img
                  className="compet_img"
                  src={selectedImage? URL.createObjectURL(selectedImage) : imgUrl}
                  alt="Thumb"
                />
            </Card>
            <br/>
            <button onClick={removeSelectedImage}>
              Remove This Image
            </button>
          </div>
        )}
      </div>
    </>



          <Card style={{ width: 900, margin: "0 auto", border: "none" }}>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={onSubmit}
              form={form}
              autoComplete="off"
              onSubmitCapture={handleSubmit} 
            >
              <Form.Item
                name={["competition", "type"]}
                label="Type"
                rules={[{ required: true }]}
              >
                <Select
                  showSearch
                  placeholder={t("add-competition.select-type")}
                  optionFilterProp="children"
                  size="large"                  
                  onChange={handleChangeType}
                  filterOption={(input, option: any) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="Cup">Cup</Option>
                  <Option value="Championship">Championship</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name={["competition", "name"]}
                label={t("name")}
                rules={[{ required: true }]}
              >
                <Input size="large" value={nameCompetition} onChange={handleChangeName} />
              </Form.Item>

              <Form.Item
                name={["competition", "country"]}
                label={t("add-competition.country")}
                rules={[{ required: true }]}
                initialValue={defaultCountry}
              >
                <Select
                  options={options}
                  showSearch
                  value={defaultCountry}
                  disabled
                  placeholder={t("add-competition.select-country")}
                  optionFilterProp="children"
                  onChange={handleChangeCountry}
                  size="large"
                  filterOption={(input: string, option: any) =>
                    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                />
              </Form.Item>

              <Form.Item
                name={["competition", "gender"]}
                label={t("gender")}
                rules={[{ required: true }]}
              >
                <Select
                  showSearch
                  placeholder={t("add-competition.select-gender")}
                  optionFilterProp="children"
                  size="large"
                  onChange={handleChangeGender}
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>

              

          
              <Button type="primary"  htmlType="submit" size="large" disabled={!nameCompetition}
                  onClick={(e:any) =>{
                    e.stopPropagation();               
                    }}
              >
                           {t("submit")}
              </Button>
           

            </Form>
          </Card>
        </div>
      </Content>
    </>
  )
  

};

export default Root;