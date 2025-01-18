import React, { useState, useEffect } from "react";
import { Loader } from "@theme";
import { useCustomer } from "@context";
import { fetchCustomerDetails, updateCustomerDetails } from "@api";

export const Account = () => {
  const { customer: customerCreds } = useCustomer();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const fetchDetails = async () => {
      if (!customerCreds?.accessToken) {
        setError("Access token is missing.");
        setLoading(false);
        return;
      }
      try {
        const data = await fetchCustomerDetails(customerCreds.accessToken);
        const defaultAddressId = data.defaultAddress?.id || null;
        const fetchedAddresses = data.addresses.edges.map((edge) => ({
          ...edge.node,
          isPrimary: edge.node.id === defaultAddressId,
        }));
        setAddresses(fetchedAddresses);
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

  const handleSave = async () => {
    if (!customerCreds?.accessToken) return;
    try {
      setSaving(true);
      const addr = addresses[0] || {};
      await updateCustomerDetails(customerCreds.accessToken, {
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        addressId: addr.id,
        address1: addr.address1,
        address2: addr.address2,
        city: addr.city,
        province: addr.province,
        zip: addr.zip,
        country: addr.country,
      });
    } catch (err) {
      setError(err.message || "Failed to update details.");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (key, value) => {
    setPersonalInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddressChange = (key, value) => {
    setAddresses((prev) => {
      if (!prev.length) return prev;
      const updated = { ...prev[0], [key]: value };
      return [updated, ...prev.slice(1)];
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-charcoal text-cream">
        <Loader />
      </div>
    );
  }

  const addr = addresses[0] || {
    address1: "",
    address2: "",
    city: "",
    province: "",
    zip: "",
    country: "",
  };

  return (
    <div className="text-charcoal w-full max-w-[1000px] bg-cream border border-charcoal rounded-md relative p-6 md:p-8">
      <NameForm
        personalInfo={personalInfo}
        handleInputChange={handleInputChange}
      />
      <AddressForm addr={addr} handleAddressChange={handleAddressChange} />
      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-4 border border-charcoal rounded-full px-6 py-2 hover:bg-charcoal hover:text-cream transition"
      >
        {saving ? "Saving..." : "Save"}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export const NameForm = ({ personalInfo, handleInputChange }) => {
  return (
    <div className="flex flex-row gap-24 mb-6 items-center">
      <div className="min-w-[120px]">Personal Info</div>
      <div className="flex-1 flex gap-4">
        <input
          className="bg-cream border border-charcoal rounded-full px-4 py-2 outline-none flex-1"
          placeholder="First Name"
          value={personalInfo.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
        />
        <input
          className="bg-cream border border-charcoal rounded-full px-4 py-2 outline-none flex-1"
          placeholder="Last Name"
          value={personalInfo.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
        />
      </div>
    </div>
  );
};

export const AddressForm = ({ addr, handleAddressChange }) => {
  return (
    <div className="flex flex-row gap-24 items-start">
      <div className="min-w-[120px]">Address</div>
      <div className="flex-1">
        <div className="flex flex-col space-y-4">
          <input
            className="bg-cream border border-charcoal rounded-full px-4 py-2 outline-none"
            placeholder="Address Line 1"
            value={addr.address1}
            onChange={(e) => handleAddressChange("address1", e.target.value)}
          />
          <input
            className="bg-cream border border-charcoal rounded-full px-4 py-2 outline-none"
            placeholder="Address Line 2"
            value={addr.address2}
            onChange={(e) => handleAddressChange("address2", e.target.value)}
          />
          <div className="flex flex-wrap gap-4">
            <input
              className="bg-cream border border-charcoal rounded-full px-4 py-2 outline-none flex-1"
              placeholder="City"
              value={addr.city}
              onChange={(e) => handleAddressChange("city", e.target.value)}
            />
            <input
              className="bg-cream border border-charcoal rounded-full px-4 py-2 outline-none flex-1"
              placeholder="State"
              value={addr.province}
              onChange={(e) => handleAddressChange("province", e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <input
              className="bg-cream border border-charcoal rounded-full px-4 py-2 outline-none flex-1"
              placeholder="Postal Code"
              value={addr.zip}
              onChange={(e) => handleAddressChange("zip", e.target.value)}
            />
            <input
              className="bg-cream border border-charcoal rounded-full px-4 py-2 outline-none flex-1"
              placeholder="Country"
              value={addr.country}
              onChange={(e) => handleAddressChange("country", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
