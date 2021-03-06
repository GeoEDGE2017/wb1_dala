from django.conf.urls import url
from .import views

urlpatterns = [


    url(r'^dl_formal_sector', views.dl_formal_sector, name='dl_formal_sector'),
    url(r'^dl_informal_sector', views.dl_informal_sector, name='dl_informal_sector'),
    url(r'^dl_forml_informl_dis', views.dl_forml_informl_dis, name='dl_forml_informl_dis'),
    url(r'^dl_summ_forml_informl_dis', views.dl_summ_forml_informl_dis, name='dl_summ_forml_informl_dis'),

    url(r'^dl_sum_forml_informl_dis_inputs', views.dl_sum_forml_informl_dis_inputs, name='dl_sum_forml_informl_dis_inputs'),

    url(r'^dl_sum_pro', views.dl_sum_pro, name='dl_sum_pro'),
    url(r'^dl_sum_nat', views.dl_sum_nat, name='dl_sum_nat'),

    url(r'^dl_summ_forml_informl_dis', views.dl_summ_forml_informl_dis, name='dl_summ_forml_informl_dis'),

]