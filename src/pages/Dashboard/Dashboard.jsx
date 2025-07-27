import React, { useEffect, useState } from "react";
import * as yup from 'yup';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from "react-redux";
import { FiPlus, FiSearch, FiUser } from "react-icons/fi";
import * as EventApi from "../../api/EventApi";
import AddEventModal from "../../components/AddEventModal";
import CustomModal from "../../components/CustomModal/CustomModal";
import DeleteModal from '../../components/CustomModal/DeleteModal';
import { toast } from 'react-toastify';
import {
  FormField,
} from "../../components/Form/FormField";
import { Row } from "react-bootstrap";
import Header from "../../components/Header";

const schema = yup.object().shape({
  name: yup.string().required('Event name is required'),
  event_date: yup
    .string()
    .required('Event date is required'),
  category_id: yup.string().required("Category is required"),
});

function Dashboard() {
  const [show, setShow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    categoryId: null,
    startDate: null,
    endDate: null
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const token = useSelector((state) => state?.app?.authUserReducer?.token);
  const user_id = useSelector((state) => state?.app?.authUserReducer?.id);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      category_id: "",
    },
    resolver: yupResolver(schema),
  });
  const loadEvents = async () => {
    setLoading(true);
    try {
      await EventApi.events({
        token,
        page,
        search: searchTerm,
        categoryId: filters.categoryId,
        startDate: filters.startDate,
        endDate: filters.endDate,
        onSuccess: (data) => {
          setEvents(data.data); // actual records
          setPagination(data); // set full pagination response
          setCurrentPage(data.current_page); // set current page
        }
      });
    } catch (error) {
      console.error("Failed to load events:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    const fetchCategories = async () => {
      try {
        const { data } = await EventApi.categories({ token });
        setCategories(data || []); // adjust based on actual API response
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchCategories();
  },[token]);

  useEffect(() => {
    loadEvents();
  }, [page, searchTerm, filters]);
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadEvents();
    }, 500); // debounce time
  
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, page, filters]);

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage && newPage > 0 && newPage <= pagination.last_page) {
      setPage(newPage); // this will trigger useEffect and reload
    }
  };
  
  useEffect(() => {
    if (token) loadEvents();
  }, [token]);

  const handleClose = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setIsEditMode(false);
    reset(); // clear form
  };

  const handleDeleteClose = () => {
    setShowDelete(false);
    setSelectedCategory(null);
  };

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
  
      const form = new FormData();
      form.append("user_id", user_id);
      form.append("category_id", formData.category_id); // ensure this is coming from the form
      form.append("name", formData.name);
      form.append("event_date", formData.event_date);
  
      // Append image only if a file is selected (edit mode may not require change)
      if (formData.image_path instanceof File) {
        form.append("image_path", formData.image_path);
      }
  
      let response;
      if (selectedEvent) {
        // UPDATE
        response = await EventApi.updateEvent({
          id: selectedEvent.id,
          token,
          data: form,
          isFormData: true,
        });
        toast.success("Event updated successfully!");
      } else {
        // CREATE
        response = await EventApi.addEvent({
          token,
          data: form,
          isFormData: true,
        });
        toast.success("Event added successfully!");
      }
  
      // Refresh and cleanup
      setEvents(response.data?.events || []);
      loadEvents();
      setShowModal(false);
      handleClose();
    } catch (error) {
      console.error("Submit failed:", error);
      toast.error(`Failed to ${selectedEvent ? "update" : "create"} event`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await EventApi.deleteEvent(token,selectedEvent);
      toast.success('Event deleted successfully');
      handleDeleteClose();
      loadEvents();
      setSelectedEvent(null);
    } catch (err) {
      toast.error('Failed to delete event');
      console.error(err);
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setIsEditMode(true);
    setShowModal(true);
    setValue("name", event.name);
    setValue("category_id", String(event.category_id));
    setValue("event_date", event.event_date);
    setValue("image_path", event.image_path); // Add this line
  };

  return (
    <div className="dashboard-wrapper">
      <div className="container-xl header" bis_skin_checked="1">
        <div className="row g-2 align-items-center" bis_skin_checked="1">
          <div className="col" bis_skin_checked="1">
          <img src="/logo192.png" alt="Logo" className="logo" />
          </div>
          <div className="col-auto ms-auto d-print-none" bis_skin_checked="1">
            <div className="btn-list" bis_skin_checked="1">
              <span className="d-none d-sm-inline">
                <FormField
                  name="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="searchClass"
                  placeholder="Ex. John's birthday"
                />
              </span>
              <Header />
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-content">
      <div className="page-header d-print-none mb-6" aria-label="Page header" bis_skin_checked="1">
          <div className="container-xl" bis_skin_checked="1">
            <div className="row g-2 align-items-center" bis_skin_checked="1">
              <div className="col" bis_skin_checked="1">
                <h2 className="page-title">Events</h2>
                <div className="page-title" bis_skin_checked="1">View and manage every events of the future.</div>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : events.length === 0 ? (
            <div className="empty-state">
                <img src=""></img>
                <p className="empty-text">
                  No Event’s to show yet! Add new event here…
                </p>
                <button className="add-button" onClick={() => {
                    setIsEditMode(false);
                    setShowModal(true);
                    reset(); // clears the form
                  }}>
                  <FiPlus /> Add New Event
                </button>
                
              </div>
          ) : (
            <>
              <div className="container-xl">
              <div className="row row-deck row-cards items-center">
                {events.map(event => (
                  <div className="col-sm-6 col-lg-4">
                    <div className="card cardClass" bis_skin_checked="1">
                      <div className="card-body" bis_skin_checked="1">
                        <img className="eventImage" src={`${process.env.REACT_APP_IMAGE_URL}/storage/${event.image_path}`} alt="Event" />
                        <div className="d-flex mb-2 mt-3" bis_skin_checked="1">
                          <div bis_skin_checked="1"></div>
                          {event.name}
                          <span className="d-flex ms-auto lh-1" onClick={() => {setSelectedEvent(event.id); setShowDelete(true)}}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 6.28259C2.58579 6.28259 2.25 6.61838 2.25 7.03259C2.25 7.44681 2.58579 7.78259 3 7.78259V6.28259ZM21 7.78259C21.4142 7.78259 21.75 7.44681 21.75 7.03259C21.75 6.61838 21.4142 6.28259 21 6.28259V7.78259ZM5 7.03259V6.28259H4.25V7.03259H5ZM19 7.03259H19.75V6.28259H19V7.03259ZM18.3418 16.8303L19.0624 17.0383L18.3418 16.8303ZM13.724 20.8553L13.8489 21.5949L13.724 20.8553ZM10.276 20.8553L10.401 20.1158L10.401 20.1158L10.276 20.8553ZM10.1183 20.8287L9.9933 21.5682H9.9933L10.1183 20.8287ZM5.65815 16.8303L4.93757 17.0383L5.65815 16.8303ZM13.8817 20.8287L13.7568 20.0892L13.8817 20.8287ZM7.84254 5.48939L8.52333 5.80406L7.84254 5.48939ZM8.81802 4.18112L8.31749 3.62258V3.62258L8.81802 4.18112ZM10.2779 3.30696L10.5389 4.01009L10.2779 3.30696ZM13.7221 3.30696L13.9831 2.60384V2.60384L13.7221 3.30696ZM16.1575 5.48939L16.8383 5.17471L16.1575 5.48939ZM3 7.78259H21V6.28259H3V7.78259ZM13.7568 20.0892L13.599 20.1158L13.8489 21.5949L14.0067 21.5682L13.7568 20.0892ZM10.401 20.1158L10.2432 20.0892L9.9933 21.5682L10.151 21.5949L10.401 20.1158ZM18.25 7.03259V12.1758H19.75V7.03259H18.25ZM5.75 12.1759V7.03259H4.25V12.1759H5.75ZM18.25 12.1758C18.25 13.6806 18.0383 15.1776 17.6212 16.6223L19.0624 17.0383C19.5185 15.4583 19.75 13.8212 19.75 12.1758H18.25ZM13.599 20.1158C12.5404 20.2947 11.4596 20.2947 10.401 20.1158L10.151 21.5949C11.3751 21.8017 12.6248 21.8017 13.8489 21.5949L13.599 20.1158ZM10.2432 20.0892C8.40523 19.7786 6.90157 18.4335 6.37873 16.6223L4.93757 17.0383C5.61878 19.3981 7.58166 21.1607 9.9933 21.5682L10.2432 20.0892ZM6.37873 16.6223C5.9617 15.1776 5.75 13.6806 5.75 12.1759H4.25C4.25 13.8212 4.48148 15.4583 4.93757 17.0383L6.37873 16.6223ZM14.0067 21.5682C16.4183 21.1607 18.3812 19.3981 19.0624 17.0383L17.6212 16.6223C17.0984 18.4335 15.5947 19.7786 13.7568 20.0892L14.0067 21.5682ZM8.25 7.03259C8.25 6.61367 8.34194 6.19649 8.52333 5.80406L7.16175 5.17471C6.89085 5.76079 6.75 6.39238 6.75 7.03259H8.25ZM8.52333 5.80406C8.70487 5.41133 8.97357 5.04881 9.31855 4.73966L8.31749 3.62258C7.82675 4.06235 7.43251 4.58893 7.16175 5.17471L8.52333 5.80406ZM9.31855 4.73966C9.66369 4.43037 10.0778 4.18126 10.5389 4.01009L10.0169 2.60384C9.38616 2.83798 8.80808 3.18295 8.31749 3.62258L9.31855 4.73966ZM10.5389 4.01009C11.0001 3.8389 11.4968 3.75 12 3.75V2.25C11.3213 2.25 10.6477 2.36972 10.0169 2.60384L10.5389 4.01009ZM12 3.75C12.5032 3.75 12.9999 3.8389 13.4611 4.01009L13.9831 2.60384C13.3523 2.36972 12.6787 2.25 12 2.25V3.75ZM13.4611 4.01009C13.9222 4.18126 14.3363 4.43037 14.6815 4.73966L15.6825 3.62258C15.1919 3.18295 14.6138 2.83798 13.9831 2.60384L13.4611 4.01009ZM14.6815 4.73966C15.0264 5.04881 15.2951 5.41133 15.4767 5.80407L16.8383 5.17471C16.5675 4.58893 16.1733 4.06235 15.6825 3.62258L14.6815 4.73966ZM15.4767 5.80406C15.6581 6.19649 15.75 6.61367 15.75 7.03259H17.25C17.25 6.39238 17.1092 5.7608 16.8383 5.17471L15.4767 5.80406ZM5 7.78259H19V6.28259H5V7.78259Z" fill="#060606"/>
                          <path d="M10 12V16M14 12V16" stroke="#060606" />
                          </svg>  
                          </span>
                          <span className="d-flex lh-1" onClick={() => {handleEdit(event)}}>
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24.4445 10.8886C22.7779 11.4441 20.5559 9.22205 21.1114 7.55551M20.9766 7.6903L17.3862 11.2807C15.8253 12.8416 14.718 14.7974 14.1826 16.9389L14.0091 17.6329C13.955 17.8491 14.1509 18.045 14.3671 17.9909L15.0611 17.8174C17.2026 17.282 19.1584 16.1747 20.7193 14.6138L24.3097 11.0234C24.7517 10.5814 25 9.98192 25 9.35684C25 8.05519 23.9448 7 22.6432 7C22.0181 7 21.4186 7.24831 20.9766 7.6903Z" stroke="#060606"/>
                          <path d="M16 7C14.9767 7 13.9533 7.11763 12.9504 7.35288C10.173 8.00437 8.00437 10.173 7.35288 12.9504C6.88237 14.9563 6.88237 17.0437 7.35288 19.0496C8.00437 21.827 10.173 23.9956 12.9504 24.6471C14.9563 25.1176 17.0437 25.1176 19.0496 24.6471C21.827 23.9956 23.9956 21.827 24.6471 19.0496C24.8824 18.0466 25 17.0233 25 16" stroke="#060606"/>
                          </svg>
                          </span>
                        </div>
                        <div className="d-flex mb-2" bis_skin_checked="1">
                          <div bis_skin_checked="1"></div>
                          {event.category?.name}
                          <span className="d-flex ms-auto lh-3">
                          {event.event_date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {showDelete && (
                  <DeleteModal
                    show={showDelete}
                    onClose={handleDeleteClose}
                    onConfirm={handleDelete}
                    itemName={selectedCategory?.name}
                  />
                )}
              </div>
              </div>

              {/* Pagination */}
              <div className="container-xl">
                <div className="flex justify-center items-center space-x-2 mt-6">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!pagination.prev_page_url}
                    className={`px-4 py-2 rounded ${
                      pagination.prev_page_url ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Previous
                  </button>

                  {Array.isArray(pagination?.links) &&
                  pagination.links
                    .filter(link => /^\d+$/.test(link.label)) // safer regex check
                    .map((link, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(Number(link.label))}
                        className={`px-4 py-2 rounded ${
                          link.active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {link.label}
                      </button>
                    ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!pagination.next_page_url}
                    className={`px-4 py-2 rounded ${
                      pagination.next_page_url ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}

        {showModal && (
          <CustomModal
            centered
            show={showModal}
            onHide={handleClose}
            modalHeading={isEditMode ? "Edit Event" : "New Event"}
            onSaveCallback={handleSubmit(onSubmit)}
          >
            <AddEventModal
              register={register}
              control={control}
              errors={errors}
              categories={categories}
              setValue={setValue}
              watch={watch}
              isOpen={showModal}
            />
          </CustomModal>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
