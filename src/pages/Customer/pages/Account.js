import React, { useEffect, useState, useMemo } from "react";
import { useCustomer } from "../../../context/CustomerContext";
import { fetchCustomerDetails, updateCustomerDetails } from "../../../api/";
import { Button, Loader } from "../../../components/theme";
import allCountriesData from "country-telephone-data";
import GRIconGarnet from "../../../assets/icons/GR-logo-garnet 3.png";

export const Account = () => {
  const { customer: customerCreds } = useCustomer();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // Addresses
  const [addresses, setAddresses] = useState([]);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [editedAddress, setEditedAddress] = useState({
    address1: "",
    address2: "",
    city: "",
    province: "",
    zip: "",
    country: "",
  });
  const [newAddress, setNewAddress] = useState({
    address1: "",
    address2: "",
    city: "",
    province: "",
    zip: "",
    country: "",
  });

  // We can still track personal info, but omit phone for now
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    // phoneNumber: "",
    // phoneCountryCode: "+1",
  });

  // Delete confirmation modal
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    addressId: null,
  });

  // Memoize dialCodes (not strictly needed if phone is disabled, but left for reference)
  // eslint-disable-next-line no-unused-vars
  const dialCodes = useMemo(() => {
    return allCountriesData.allCountries.map(({ name, iso2, dialCode }) => ({
      name,
      iso2,
      dialCode: `+${dialCode}`,
    }));
  }, []);

  // Fetch details once on mount
  useEffect(() => {
    const fetchDetails = async () => {
      if (!customerCreds?.accessToken) {
        setError("Access token is missing.");
        setLoading(false);
        return;
      }

      try {
        const data = await fetchCustomerDetails(customerCreds.accessToken);

        // Mark which address is default/primary
        const defaultAddressId = data.defaultAddress?.id || null;
        const fetchedAddresses = data.addresses.edges.map((edge) => ({
          ...edge.node,
          isPrimary: edge.node.id === defaultAddressId,
        }));
        setAddresses(fetchedAddresses);

        // If you still want to read phone, you can do so here
        // but we won't display or edit it
        // e.g.:
        // const phoneValue = data.phone || "";
        // (not used if phone is fully disabled)

        setPersonalInfo({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
        });
      } catch (err) {
        setError(err.message || "An error occurred while fetching details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [customerCreds]);

  // --------------------------------------------------------
  // Save Personal Info (TODO add phone number)
  // --------------------------------------------------------
  const handleSavePersonalInfo = async () => {
    if (!customerCreds?.accessToken) return;
    try {
      setSaving(true);

      // No phone included => phone remains unchanged in Shopify
      await updateCustomerDetails(customerCreds.accessToken, {
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        // phone: fullPhone, // omitted
      });
    } catch (err) {
      setError(err.message || "Failed to update personal info.");
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------------
  // Set an existing address as primary
  // --------------------------------------------------------
  const handleSetPrimary = async (addressId) => {
    if (!customerCreds?.accessToken) return;
    try {
      setSaving(true);
      await updateCustomerDetails(customerCreds.accessToken, {
        primaryAddressId: addressId,
      });
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === addressId
            ? { ...addr, isPrimary: true }
            : { ...addr, isPrimary: false }
        )
      );
    } catch (err) {
      setError(err.message || "Failed to set primary address.");
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------------
  // Delete Confirm Modal
  // --------------------------------------------------------
  const openDeleteConfirm = (addressId) => {
    setDeleteConfirm({ isOpen: true, addressId });
  };
  const closeDeleteConfirm = () => {
    setDeleteConfirm({ isOpen: false, addressId: null });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm.addressId || !customerCreds?.accessToken) return;

    try {
      setSaving(true);
      await updateCustomerDetails(customerCreds.accessToken, {
        deleteAddressId: deleteConfirm.addressId,
      });
      // Remove from local state
      setAddresses((prev) =>
        prev.filter((addr) => addr.id !== deleteConfirm.addressId)
      );
    } catch (err) {
      setError(err.message || "Failed to delete address.");
    } finally {
      setSaving(false);
      closeDeleteConfirm();
    }
  };

  // --------------------------------------------------------
  // Edit Address
  // --------------------------------------------------------
  const handleEdit = (address) => {
    setEditingAddressId(address.id);
    setEditedAddress({
      address1: address.address1 || "",
      address2: address.address2 || "",
      city: address.city || "",
      province: address.province || "",
      zip: address.zip || "",
      country: address.country || "",
    });
  };

  const handleSaveEdit = async () => {
    if (!customerCreds?.accessToken || !editingAddressId) return;
    try {
      setSaving(true);
      await updateCustomerDetails(customerCreds.accessToken, {
        addressId: editingAddressId,
        ...editedAddress,
      });
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddressId ? { ...addr, ...editedAddress } : addr
        )
      );
      setEditingAddressId(null);
    } catch (err) {
      setError(err.message || "Failed to edit address.");
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------------
  // Add New Address
  // --------------------------------------------------------
  const handleAddNewAddress = async () => {
    if (!customerCreds?.accessToken) return;

    try {
      setSaving(true);
      await updateCustomerDetails(customerCreds.accessToken, {
        ...newAddress,
      });
      setNewAddress({
        address1: "",
        address2: "",
        city: "",
        province: "",
        zip: "",
        country: "",
      });
    } catch (err) {
      setError(err.message || "Failed to add new address.");
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------------
  // Rendering
  // --------------------------------------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-charcoal text-cream">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-charcoal text-cream">
        <h2 className="text-2xl font-bold text-rose">Error</h2>
        <p className="text-lg mt-4">{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* DELETE CONFIRM MODAL */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black rounded p-6">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-4">
              Are you sure you want to delete this address?
            </p>
            <div className="flex justify-end gap-4">
              <Button
                onClick={handleConfirmDelete}
                disabled={saving}
                className="bg-red-600 hover:bg-red-500 text-white"
              >
                {saving ? "Deleting..." : "Yes, Delete"}
              </Button>
              <Button onClick={closeDeleteConfirm} variant="secondary">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col min-h-screen bg-charcoal text-cream p-6 gap-8">
        <h1 className="text-3xl font-bold">Account & Payment</h1>

        {/* ---------------------------------
            Personal Info
        --------------------------------- */}
        <div className="bg-[#1E1E1E] p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Personal Info</h2>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              className="p-2 border border-gray-700 bg-charcoal rounded text-cream"
              placeholder="First Name"
              value={personalInfo.firstName}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, firstName: e.target.value })
              }
            />

            <input
              type="text"
              className="p-2 border border-gray-700 bg-charcoal rounded text-cream"
              placeholder="Last Name"
              value={personalInfo.lastName}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, lastName: e.target.value })
              }
            />

            {/* Phone code & number - DISABLED / COMMENTED OUT
            <div className="flex gap-2 items-center">
              <select disabled className="p-2 border border-gray-700 bg-charcoal text-cream rounded w-[6rem]">
                <option>+1</option>
              </select>

              <input
                disabled
                type="text"
                className="p-2 border border-gray-700 bg-charcoal rounded text-cream"
                placeholder="Phone Number"
                value=""
              />
            </div>
            */}
          </div>

          <Button
            onClick={handleSavePersonalInfo}
            className="mt-4 px-2"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Personal Info"}
          </Button>
        </div>

        {/* ---------------------------------
            Addresses
        --------------------------------- */}
        <div>
          <h2 className="text-3xl font-semibold mb-6">Addresses</h2>
          <div className="space-y-4">
            {addresses.map((address) => {
              const isEditing = address.id === editingAddressId;

              return (
                <div
                  key={address.id}
                  className="relative bg-[#1E1E1E] rounded-md shadow-md p-6"
                >
                  {/* Show garnet icon if primary, positioned top-right and out of the way */}
                  {address.isPrimary && (
                    <img
                      src={GRIconGarnet}
                      alt="Primary Icon"
                      className="absolute top-4 right-4"
                    />
                  )}

                  {isEditing ? (
                    // ---------- Edit Mode ----------
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        className="p-2 border border-gray-700 bg-charcoal rounded text-cream"
                        placeholder="Address 1"
                        value={editedAddress.address1}
                        onChange={(e) =>
                          setEditedAddress({
                            ...editedAddress,
                            address1: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        className="p-2 border border-gray-700 bg-charcoal rounded text-cream"
                        placeholder="Address 2"
                        value={editedAddress.address2}
                        onChange={(e) =>
                          setEditedAddress({
                            ...editedAddress,
                            address2: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        className="p-2 border border-gray-700 bg-charcoal rounded text-cream"
                        placeholder="City"
                        value={editedAddress.city}
                        onChange={(e) =>
                          setEditedAddress({
                            ...editedAddress,
                            city: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        className="p-2 border border-gray-700 bg-charcoal rounded text-cream"
                        placeholder="Province / State"
                        value={editedAddress.province}
                        onChange={(e) =>
                          setEditedAddress({
                            ...editedAddress,
                            province: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        className="p-2 border border-gray-700 bg-charcoal rounded text-cream"
                        placeholder="ZIP / Postal Code"
                        value={editedAddress.zip}
                        onChange={(e) =>
                          setEditedAddress({
                            ...editedAddress,
                            zip: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        className="p-2 border border-gray-700 bg-charcoal rounded text-cream"
                        placeholder="Country"
                        value={editedAddress.country}
                        onChange={(e) =>
                          setEditedAddress({
                            ...editedAddress,
                            country: e.target.value,
                          })
                        }
                      />

                      <div className="flex gap-4 mt-2 justify-end">
                        <Button onClick={handleSaveEdit} disabled={saving}>
                          {saving ? "Saving..." : "Save"}
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setEditingAddressId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // ---------- Display Mode ----------
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      {/* Address Text */}
                      <div>
                        <p className="mb-1">
                          <div className="font-bold">{address.address1}</div>
                          {address.address2 && `, ${address.address2}`}
                        </p>
                        <p className="mb-1">
                          {address.city}, {address.province} {address.zip}
                        </p>
                        <p>{address.country}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col items-end gap-2 sm:items-center sm:flex-row sm:gap-4">
                        {!address.isPrimary && (
                          <button
                            className="text-sm"
                            onClick={() => handleSetPrimary(address.id)}
                            disabled={address.isPrimary || saving}
                          >
                            Set as Primary
                          </button>
                        )}
                        <button
                          className="text-sm"
                          onClick={() => handleEdit(address)}
                          disabled={saving}
                        >
                          Edit
                        </button>
                        <Button
                          variant="danger"
                          onClick={() => openDeleteConfirm(address.id)}
                          disabled={saving}
                          className="px-4"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add New Address */}
          <div className="mt-6 p-4 bg-[#1E1E1E] rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-2">Add New Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                className="p-2 border border-gray-700 bg-charcoal rounded text-cream"
                placeholder="Address Line 1"
                value={newAddress.address1}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, address1: e.target.value })
                }
              />
              <input
                type="text"
                className="p-2 border border-gray-700 bg-charcoal rounded text-cream"
                placeholder="Address Line 2"
                value={newAddress.address2}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, address2: e.target.value })
                }
              />
              <input
                type="text"
                className="p-2 border border-gray-700 bg-charcoal rounded text-cream"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
              />
              <input
                type="text"
                className="p-2 border border-gray-700 bg-charcoal rounded text-cream"
                placeholder="Province / State"
                value={newAddress.province}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, province: e.target.value })
                }
              />
              <input
                type="text"
                className="p-2 border border-gray-700 bg-charcoal rounded text-cream"
                placeholder="ZIP / Postal Code"
                value={newAddress.zip}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, zip: e.target.value })
                }
              />
              <input
                type="text"
                className="p-2 border border-gray-700 bg-charcoal rounded text-cream"
                placeholder="Country"
                value={newAddress.country}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, country: e.target.value })
                }
              />
            </div>
            <Button
              onClick={handleAddNewAddress}
              disabled={saving}
              className="mt-2"
            >
              {saving ? "Saving..." : "Add Address"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
