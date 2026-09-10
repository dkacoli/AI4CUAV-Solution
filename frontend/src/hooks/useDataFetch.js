import { useState, useEffect } from "react";
import { listDatasets } from "../services/datasetService";
import { listOrders } from "../services/orderService";

export function useFetchDatasets() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDatasets = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listDatasets();
      setDatasets(data || []);
    } catch (err) {
      setError(err?.message || "Failed to fetch datasets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  return { datasets, loading, error, refetch: fetchDatasets };
}

export function useFetchOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listOrders();
      setOrders(data || []);
    } catch (err) {
      setError(err?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loading, error, refetch: fetchOrders };
}
