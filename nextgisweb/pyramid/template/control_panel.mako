<%inherit file='nextgisweb:pyramid/template/base.mako' />

<% from bunch import Bunch; kwargs = Bunch(request=request) %>
<%include file="dynmenu.mako" args="dynmenu=control_panel, args=kwargs" />