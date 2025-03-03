import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitComplaint, resetStatus } from "../redux/complaintSlice";
import InputText from "../components/form/InputText";
import Input from "../components/form/Input";
import InputSelect from "../components/form/InputSelect";
import TextArea from "../components/form/TextArea";

const ComplaintForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.complaint);

  const [formData, setFormData] = useState({
    name: "",
    place: "",
    work: "",
    phone: "",
    email: "",
    news_type: "",
    media_outlet: "",
    date: "",
    media_url: "",
    news_title: "",
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
    explanation: "",
    action1: false,
    action2: false,
    action3: false,
    action4: false,
    action5: false,
    action6: false,
    file: null,
    tamko: false,
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    // Reset form status when component unmounts
    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch]);

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Jina linahitajika";
    }

    if (!formData.email.trim()) {
      errors.email = "Barua pepe inahitajika";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Barua pepe si sahihi";
    }

    if (!formData.tamko) {
      errors.tamko = "Tafadhali kubali tamko";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(submitComplaint(formData));
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      setFormData({
        name: "",
        place: "",
        work: "",
        phone: "",
        email: "",
        news_type: "",
        media_outlet: "",
        date: "",
        media_url: "",
        news_title: "",
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false,
        explanation: "",
        action1: false,
        action2: false,
        action3: false,
        action4: false,
        action5: false,
        action6: false,
        file: null,
        tamko: false,
      });

      const timer = setTimeout(() => {
        dispatch(resetStatus());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status, dispatch]);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Fomu ya Malalamiko ya Maudhui ya Habari
      </h1>

      {status === "succeeded" && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Malalamiko yako yamepokelewa. Asante kwa kuwasiliana nasi!
        </div>
      )}

      {status === "failed" && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error || "Hitilafu imetokea. Tafadhali jaribu tena."}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputText
          label="Jina Kamili"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <InputText
          label="Mkoa/Wilaya"
          name="place"
          value={formData.place}
          onChange={handleChange}
        />

        <InputText
          label="Taaluma / Kazi"
          name="work"
          value={formData.work}
          onChange={handleChange}
        />

        <Input
          label="Namba ya Simu"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
        />

        <Input
          label="Barua Pepe"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <InputSelect
          label="Aina ya Habari Inayolalamikiwa"
          name="news_type"
          value={formData.value}
          onChange={handleChange}
        />

        <InputText
          label="Chombo cha Habari Kilichochapisha/Kurusha Habari"
          name="media_outlet"
          value={formData.media_outlet}
          onChange={handleChange}
        />

        <Input
          label="Tarehe Iliyochapishwa/Kurushwa Hewa"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <InputText
          label="Kiungo (URL) cha Habari (ikiwa ipo mtandaoni)"
          name="media_url"
          value={formData.media_outlet}
          onChange={handleChange}
        />

        <InputText
          label="Kichwa cha Habari / Mada Kuu"
          name="news_title"
          value={formData.news_title}
          onChange={handleChange}
        />

        <div className="space-y-1">
          <label className="block text-gray-700 font-medium ">
            Madhara ya Habari Hii Kwako
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="option1"
                checked={formData.option1}
                onChange={handleCheckboxChange}
                className="mr-2"
              />{" "}
              Imenichafua jina/sifa
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="option2"
                checked={formData.option2}
                onChange={handleCheckboxChange}
                className="mr-2"
              />{" "}
              Imetoa taarifa za uongo/upotoshaji
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="option3"
                checked={formData.option3}
                onChange={handleCheckboxChange}
                className="mr-2"
              />{" "}
              Inakiuka maadili ya uandishi wa habari
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="option4"
                checked={formData.option4}
                onChange={handleCheckboxChange}
                className="mr-2"
              />{" "}
              Inahamasisha chuki au ubaguzi
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="option5"
                checked={formData.option5}
                onChange={handleCheckboxChange}
                className="mr-2"
              />{" "}
              Nyingine (Ufafanue)
            </label>
          </div>
        </div>

        <TextArea
          label="Maelezo ya Malalamiko"
          name="explanation"
          value={formData.explanation}
          onChange={handleChange}
        />

        <div className="space-y-1">
          <label className="block text-gray-700 font-medium">
            Ungependa hatua gani zichukuliwe?
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="action1"
                checked={formData.action1}
                onChange={handleCheckboxChange}
                className="mr-2"
              />{" "}
              Habari ifutwe
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="action2"
                checked={formData.action2}
                onChange={handleCheckboxChange}
                className="mr-2"
              />{" "}
              Kuombwa radhi hadharani
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="action3"
                checked={formData.action3}
                onChange={handleCheckboxChange}
                className="mr-2"
              />{" "}
              Kufanyiwa marekebisho ya habari
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="action4"
                checked={formData.action4}
                onChange={handleCheckboxChange}
                className="mr-2"
              />{" "}
              Kuita mwandishi/mhariri kwa mahojiano
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="action5"
                checked={formData.action5}
                onChange={handleCheckboxChange}
                className="mr-2"
              />{" "}
              Kuwasilishwa kwa Tume ya Maadili ya Vyombo vya Habari
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="action6"
                checked={formData.action6}
                onChange={handleCheckboxChange}
                className="mr-2"
              />{" "}
              Nyingine (Ufafanue)
            </label>
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="file" className="block text-gray-700 font-medium">
            Ambatanisha Vielelezo
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="w-full p-1 border rounded focus:outline-none focus:ring-2"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-gray-700 font-medium">
            Tamko la Mlalamikaji
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="tamko"
                checked={formData.tamko}
                onChange={handleChange}
                className="mr-2"
              />
              Ninakubali kuwa taarifa nilizotoa ni sahihi na zinaweza kutumiwa
              na MCT kwa uchunguzi.
            </label>
            {validationErrors.tamko && (
              <p className="text-red-500 text-sm">{validationErrors.tamko}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-full py-2 px-4 rounded text-white font-medium ${
            status === "loading"
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {status === "loading" ? "Inatuma..." : "Tuma Malalamiko"}
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
