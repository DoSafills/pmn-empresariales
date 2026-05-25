import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  LogOut,
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  CalendarCheck,
  TrendingUp,
  Search,
  Check,
  X,
} from "lucide-react";

type EstadoTutoria = "Pendiente aceptación" | "Aceptada" | "Programada" | "Completada" | "Cancelada";

interface Tutoria {
  id: number;
  estudiante: string;
  semestre: number;
  ramo: string;
  tema: string;
  prioridad: "Alta" | "Media" | "Baja";
  estado: EstadoTutoria;
  fechaSolicitud: string;
  fechaTutoria?: string;
  asistenciaRegistrada?: boolean;
  asistio?: boolean;
}

interface Notificacion {
  id: number;
  tipo: "nueva_tutoria" | "mensaje_admin" | "recordatorio";
  titulo: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
}

const tutoriasMock: Tutoria[] = [
  {
    id: 1,
    estudiante: "María González",
    semestre: 3,
    ramo: "Cálculo II",
    tema: "Integrales dobles",
    prioridad: "Alta",
    estado: "Pendiente aceptación",
    fechaSolicitud: "2026-05-23",
  },
  {
    id: 2,
    estudiante: "Juan Pérez",
    semestre: 5,
    ramo: "Programación Avanzada",
    tema: "POO y herencia",
    prioridad: "Media",
    estado: "Programada",
    fechaSolicitud: "2026-05-20",
    fechaTutoria: "2026-05-25 14:00",
  },
  {
    id: 3,
    estudiante: "Ana Martínez",
    semestre: 2,
    ramo: "Álgebra Lineal",
    tema: "Vectores y matrices",
    prioridad: "Alta",
    estado: "Completada",
    fechaSolicitud: "2026-05-10",
    fechaTutoria: "2026-05-15 10:00",
    asistenciaRegistrada: true,
    asistio: true,
  },
  {
    id: 4,
    estudiante: "Pedro Silva",
    semestre: 4,
    ramo: "Física I",
    tema: "Cinemática",
    prioridad: "Baja",
    estado: "Completada",
    fechaSolicitud: "2026-05-08",
    fechaTutoria: "2026-05-12 16:00",
    asistenciaRegistrada: true,
    asistio: false,
  },
  {
    id: 5,
    estudiante: "Sofía Ramírez",
    semestre: 6,
    ramo: "Base de Datos",
    tema: "Normalización",
    prioridad: "Media",
    estado: "Completada",
    fechaSolicitud: "2026-05-05",
    fechaTutoria: "2026-05-08 11:00",
    asistenciaRegistrada: false,
  },
  {
    id: 6,
    estudiante: "Diego Vargas",
    semestre: 3,
    ramo: "Estructuras de Datos",
    tema: "Árboles binarios",
    prioridad: "Alta",
    estado: "Aceptada",
    fechaSolicitud: "2026-05-21",
  },
    {
    id: 1779670463284,
    estudiante: "Ricardo",
    semestre: 6,
    ramo: "Progrmaciion 1",
    tema: "Iteraciones",
    prioridad: "Media",
    estado: "Pendiente aceptación",
    fechaSolicitud: "2026-06-02",
  },
];

const notificacionesMock: Notificacion[] = [
  {
    id: 1,
    tipo: "nueva_tutoria",
    titulo: "Nueva solicitud de tutoría",
    mensaje: "María González solicitó tutoría de Cálculo II",
    fecha: "2026-05-23 09:30",
    leida: false,
  },
  {
    id: 2,
    tipo: "mensaje_admin",
    titulo: "Mensaje del administrador",
    mensaje: "Recordatorio: Registrar asistencia dentro de 24hrs después de cada tutoría",
    fecha: "2026-05-22 14:00",
    leida: false,
  },
  {
    id: 3,
    tipo: "recordatorio",
    titulo: "Tutoría próxima",
    mensaje: "Tienes una tutoría programada mañana a las 14:00 con Juan Pérez",
    fecha: "2026-05-24 10:00",
    leida: true,
  },
  {
    id: 4,
    tipo: "mensaje_admin",
    titulo: "Actualización del sistema",
    mensaje: "Se agregaron nuevas funcionalidades al portal de tutores",
    fecha: "2026-05-20 08:00",
    leida: true,
  },
];

export default function DashboardTutor() {
  const navigate = useNavigate();
  const [vistaActiva, setVistaActiva] = useState<"tutorias" | "notificaciones">("tutorias");
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState<EstadoTutoria | "Todos">("Todos");
  const [tutorias, setTutorias] = useState(tutoriasMock);
  const [notificaciones, setNotificaciones] = useState(notificacionesMock);

  const tutoriasFiltradas = tutorias.filter((tut) => {
    const coincideBusqueda =
      tut.estudiante.toLowerCase().includes(busqueda.toLowerCase()) ||
      tut.ramo.toLowerCase().includes(busqueda.toLowerCase()) ||
      tut.tema.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado =
      filtroEstado === "Todos" || tut.estado === filtroEstado;

    return coincideBusqueda && coincideEstado;
  });

  const estadisticas = {
    pendientes: tutorias.filter((t) => t.estado === "Pendiente aceptación").length,
    programadas: tutorias.filter((t) => t.estado === "Programada").length,
    completadas: tutorias.filter((t) => t.estado === "Completada").length,
    asistencias: tutorias.filter((t) => t.asistio === true).length,
    inasistencias: tutorias.filter((t) => t.asistio === false).length,
    sinRegistrar: tutorias.filter(
      (t) => t.estado === "Completada" && !t.asistenciaRegistrada
    ).length,
  };

  const notificacionesNoLeidas = notificaciones.filter((n) => !n.leida).length;

  const aceptarTutoria = (id: number) => {
    setTutorias(
      tutorias.map((t) =>
        t.id === id ? { ...t, estado: "Aceptada" as EstadoTutoria } : t
      )
    );
  };

  const rechazarTutoria = (id: number) => {
    if (confirm("¿Estás seguro de rechazar esta solicitud?")) {
      setTutorias(
        tutorias.map((t) =>
          t.id === id ? { ...t, estado: "Cancelada" as EstadoTutoria } : t
        )
      );
    }
  };

  const cancelarTutoria = (id: number) => {
    if (confirm("¿Estás seguro de cancelar esta tutoría?")) {
      setTutorias(
        tutorias.map((t) =>
          t.id === id ? { ...t, estado: "Cancelada" as EstadoTutoria } : t
        )
      );
    }
  };

  const registrarAsistencia = (id: number, asistio: boolean) => {
    setTutorias(
      tutorias.map((t) =>
        t.id === id ? { ...t, asistenciaRegistrada: true, asistio } : t
      )
    );
  };

  const marcarNotificacionLeida = (id: number) => {
    setNotificaciones(
      notificaciones.map((n) => (n.id === id ? { ...n, leida: true } : n))
    );
  };

  const getEstadoBadgeVariant = (estado: EstadoTutoria) => {
    const variants: Record<EstadoTutoria, "default" | "secondary" | "destructive" | "outline"> = {
      "Pendiente aceptación": "outline",
      Aceptada: "secondary",
      Programada: "default",
      Completada: "secondary",
      Cancelada: "destructive",
    };
    return variants[estado];
  };

  const getNotificacionIcon = (tipo: string) => {
    if (tipo === "nueva_tutoria") return "bg-blue-100 text-blue-600 border-blue-200";
    if (tipo === "mensaje_admin") return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-green-100 text-green-600 border-green-200";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Portal de Tutores</h1>
            <p className="text-sm text-muted-foreground">Dr. Carlos Ruiz</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setVistaActiva("notificaciones")}
              className="relative"
            >
              <Bell className="mr-2 h-4 w-4" />
              Notificaciones
              {notificacionesNoLeidas > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {notificacionesNoLeidas}
                </span>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate("/login-tutor")}>
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex gap-2 mb-6">
          <Button
            variant={vistaActiva === "tutorias" ? "default" : "outline"}
            onClick={() => setVistaActiva("tutorias")}
          >
            Mis Tutorías
          </Button>
          <Button
            variant={vistaActiva === "notificaciones" ? "default" : "outline"}
            onClick={() => setVistaActiva("notificaciones")}
          >
            Notificaciones ({notificacionesNoLeidas})
          </Button>
        </div>

        {vistaActiva === "tutorias" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-2xl font-bold">{estadisticas.pendientes}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Por aceptar</p>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                    <span className="text-2xl font-bold">{estadisticas.programadas}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Programadas</p>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-2xl font-bold">{estadisticas.completadas}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Completadas</p>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">
                      {estadisticas.asistencias}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Asistencias</p>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-2xl font-bold text-red-600">
                      {estadisticas.inasistencias}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Inasistencias</p>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <TrendingUp className="h-4 w-4 text-orange-600" />
                    <span className="text-2xl font-bold text-orange-600">
                      {estadisticas.sinRegistrar}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Sin registrar</p>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Gestión de Tutorías</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por estudiante, ramo o tema..."
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <select
                    value={filtroEstado}
                    onChange={(e) =>
                      setFiltroEstado(e.target.value as EstadoTutoria | "Todos")
                    }
                    className="h-9 rounded-md border border-input bg-input-background px-3 text-sm"
                  >
                    <option value="Todos">Todos los estados</option>
                    <option value="Pendiente aceptación">Pendiente aceptación</option>
                    <option value="Aceptada">Aceptada</option>
                    <option value="Programada">Programada</option>
                    <option value="Completada">Completada</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Estudiante</TableHead>
                        <TableHead>Sem.</TableHead>
                        <TableHead>Ramo</TableHead>
                        <TableHead>Tema</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha Tutoría</TableHead>
                        <TableHead>Asistencia</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tutoriasFiltradas.map((tutoria) => (
                        <TableRow key={tutoria.id}>
                          <TableCell className="font-medium">#{tutoria.id}</TableCell>
                          <TableCell>{tutoria.estudiante}</TableCell>
                          <TableCell>{tutoria.semestre}</TableCell>
                          <TableCell>{tutoria.ramo}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {tutoria.tema}
                          </TableCell>
                          <TableCell>
                            <Badge variant={getEstadoBadgeVariant(tutoria.estado)}>
                              {tutoria.estado}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {tutoria.fechaTutoria || "—"}
                          </TableCell>
                          <TableCell>
                            {tutoria.asistenciaRegistrada ? (
                              tutoria.asistio ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  Asistió
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                  No asistió
                                </Badge>
                              )
                            ) : tutoria.estado === "Completada" ? (
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => registrarAsistencia(tutoria.id, true)}
                                  className="h-7 px-2"
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => registrarAsistencia(tutoria.id, false)}
                                  className="h-7 px-2"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              "—"
                            )}
                          </TableCell>
                          <TableCell>
                            {tutoria.estado === "Pendiente aceptación" && (
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  onClick={() => aceptarTutoria(tutoria.id)}
                                  className="h-7 px-2"
                                >
                                  Aceptar
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => rechazarTutoria(tutoria.id)}
                                  className="h-7 px-2"
                                >
                                  Rechazar
                                </Button>
                              </div>
                            )}
                            {(tutoria.estado === "Aceptada" ||
                              tutoria.estado === "Programada") && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => cancelarTutoria(tutoria.id)}
                                className="h-7 px-2"
                              >
                                Cancelar
                              </Button>
                            )}
                            {(tutoria.estado === "Completada" ||
                              tutoria.estado === "Cancelada") &&
                              "—"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progreso General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tasa de asistencia</span>
                    <span className="font-medium">
                      {estadisticas.asistencias + estadisticas.inasistencias > 0
                        ? Math.round(
                            (estadisticas.asistencias /
                              (estadisticas.asistencias + estadisticas.inasistencias)) *
                              100
                          )
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{
                        width: `${
                          estadisticas.asistencias + estadisticas.inasistencias > 0
                            ? (estadisticas.asistencias /
                                (estadisticas.asistencias + estadisticas.inasistencias)) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tutorías completadas</span>
                    <span className="font-medium">
                      {estadisticas.completadas} / {tutorias.length}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{
                        width: `${
                          tutorias.length > 0
                            ? (estadisticas.completadas / tutorias.length) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Total tutorías</p>
                    <p className="text-2xl font-bold">{tutorias.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Promedio asistencia</p>
                    <p className="text-2xl font-bold">
                      {estadisticas.asistencias + estadisticas.inasistencias > 0
                        ? Math.round(
                            (estadisticas.asistencias /
                              (estadisticas.asistencias + estadisticas.inasistencias)) *
                              100
                          )
                        : 0}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {vistaActiva === "notificaciones" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Centro de Notificaciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notificaciones.map((notificacion) => (
                  <div
                    key={notificacion.id}
                    className={`rounded-lg border p-4 ${getNotificacionIcon(notificacion.tipo)} ${
                      notificacion.leida ? "opacity-60" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <Bell className="h-5 w-5 shrink-0 mt-0.5" />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium">{notificacion.titulo}</p>
                          {!notificacion.leida && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => marcarNotificacionLeida(notificacion.id)}
                              className="h-6 px-2"
                            >
                              Marcar leída
                            </Button>
                          )}
                        </div>
                        <p className="text-sm opacity-90">{notificacion.mensaje}</p>
                        <p className="text-xs opacity-75">{notificacion.fecha}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
