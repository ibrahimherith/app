import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitComplaint, resetStatus } from "../redux/complaintSlice";

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

    // Clear validation error when typing
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

  // Reset form after successful submission
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

      // Reset status after 5 seconds
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
        <div className="space-y-1">
          <label htmlFor="name" className="block text-gray-700 font-medium ">
            Jina Kamili
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={
              "w-full p-1 border rounded focus:outline-none focus:ring-2"
            }
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="place" className="block text-gray-700 font-medium">
            Mkoa/Wilaya Anayotoka
          </label>
          <input
            type="text"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleChange}
            className={
              "w-full p-1 border rounded focus:outline-none focus:ring-2"
            }
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="work" className="block text-gray-700 font-medium ">
            Taaluma/Kazi
          </label>
          <input
            type="text"
            id="work"
            name="work"
            value={formData.work}
            onChange={handleChange}
            className={
              "w-full p-1 border rounded focus:outline-none focus:ring-2"
            }
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="phone" className="block text-gray-700 font-medium">
            Namba ya Simu
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={
              "w-full p-1 border rounded focus:outline-none focus:ring-2"
            }
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Barua Pepe
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={
              "w-full p-1 border rounded focus:outline-none focus:ring-2"
            }
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="news_type"
            className="block text-gray-700 font-medium"
          >
            Aina ya Habari Inayolalamikiwa
          </label>
          <select
            name="news_type"
            className="w-full p-1 border rounded focus:outline-none focus:ring-2"
            onChange={handleChange}
          >
            <option value="">Chagua Aina ya Habari</option>
            <option value="Makala">Makala</option>
            <option value="Habari za Runinga">Habari za Runinga</option>
            <option value="Habari za Redio">Habari za Redio</option>
            <option value="Habari za Mitandao ya Kijamii">
              Habari za Mitandao ya Kijamii
            </option>
            <option value="Picha / Video">Picha / Video</option>
          </select>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="media_outlet"
            className="block text-gray-700 font-medium"
          >
            Chombo cha Habari Kilichochapisha/Kurusha Habari
          </label>
          <input
            type="text"
            id="media_outlet"
            name="media_outlet"
            value={formData.media_outlet}
            onChange={handleChange}
            className={
              "w-full p-1 border rounded focus:outline-none focus:ring-2"
            }
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="date" className="block text-gray-700 font-medium">
            Tarehe Iliyochapishwa/Kurushwa Hewa
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-1 border rounded focus:outline-none focus:ring-2"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="media_url"
            className="block text-gray-700 font-medium"
          >
            Kiungo (URL) cha Habari (ikiwa ipo mtandaoni)
          </label>
          <input
            type="text"
            id="media_url"
            name="media_url"
            value={formData.media_url}
            onChange={handleChange}
            className={
              "w-full p-1 border rounded focus:outline-none focus:ring-2"
            }
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="news_title"
            className="block text-gray-700 font-medium"
          >
            Kichwa cha Habari / Mada Kuu
          </label>
          <input
            type="text"
            id="news_title"
            name="news_title"
            value={formData.news_title}
            onChange={handleChange}
            className={
              "w-full p-1 border rounded focus:outline-none focus:ring-2"
            }
            required
          />
        </div>

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

        <div className="space-y-1">
          <label
            htmlFor="explanation"
            className="block text-gray-700 font-medium"
          >
            Maelezo ya Malalamiko
          </label>
          <textarea
            id="explanation"
            name="explanation"
            className="w-full border rounded p-2"
            maxLength={1000}
            value={formData.explanation}
            onChange={handleChange}
          ></textarea>
        </div>

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
