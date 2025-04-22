import { useEffect, useMemo, useState } from "react";

interface Ubigeo {
  departamento: string;
  provincia: string;
  distrito: string;
  nombre: string;
}

interface UbigeoOption {
  code: string;
  name: string;
}

const UBIGEOS_API_URL = import.meta.env.VITE_UBIGEOS_API;

export const useUbigeos = () => {
  const [ubigeos, setUbigeos] = useState<Ubigeo[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadUbigeos = async () => {
      const cached = localStorage.getItem("ubigeos");
      if (cached) {
        setUbigeos(JSON.parse(cached));
        setLoading(false);
      } else {
        const res = await fetch(UBIGEOS_API_URL);
        const data = await res.json();
        localStorage.setItem("ubigeos", JSON.stringify(data));
        setUbigeos(data);
        setLoading(false);
      }
    };

    loadUbigeos();

  }, []);

  const departamentos: UbigeoOption[] = useMemo(() => {
    return ubigeos
      .filter(u => u.provincia === "00" && u.distrito === "00")
      .map(u => ({ code: u.departamento, name: u.nombre }));
  }, [ubigeos]);

  const getProvincias = (departamentoCode: string): UbigeoOption[] => {
    return ubigeos
      .filter(u => u.departamento === departamentoCode && u.provincia !== "00" && u.distrito === "00")
      .map(u => ({ code: u.provincia, name: u.nombre }));
  };

  const getDistritos = (departamentoCode: string, provinciaCode: string): UbigeoOption[] => {
    return ubigeos
      .filter(u =>
        u.departamento === departamentoCode &&
        u.provincia === provinciaCode &&
        u.distrito !== "00"
      )
      .map(u => ({ code: u.distrito, name: u.nombre }));
  };

  const getDepartamento = (code: string) =>
    ubigeos.find(u => u.departamento === code && u.provincia === "00" && u.distrito === "00");

  const getProvincia = (depCode: string, provCode: string) =>
    ubigeos.find(u => u.departamento === depCode && u.provincia === provCode && u.distrito === "00");

  const getDistrito = (depCode: string, provCode: string, distCode: string) =>
    ubigeos.find(u =>
      u.departamento === depCode &&
      u.provincia === provCode &&
      u.distrito === distCode);


  return {
    loading,
    departamentos,
    getProvincias,
    getDistritos,
    getDepartamento,
    getProvincia,
    getDistrito,
  };
};