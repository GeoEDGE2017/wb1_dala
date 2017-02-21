from django.db import models
from incidents.models import IncidentReport
from settings.models import District, Province


class DlAirDmgAircrafts(models.Model):
    tot_destroyed_pub = models.BigIntegerField(blank=True, null=True)
    tot_destroyed_pvt = models.BigIntegerField(blank=True, null=True)
    part_damaged_pub = models.BigIntegerField(blank=True, null=True)
    part_damaged_pvt = models.BigIntegerField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'transport_air\".\"dl_air_dmg_aircrafts'


class DlAirDmgEquipment(models.Model):
    tot_destroyed = models.BigIntegerField(blank=True, null=True)
    part_damaged = models.BigIntegerField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)
    tot_dmg_pub = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'transport_air\".\"dl_air_dmg_equipment'


class DlAirDmgSupplies(models.Model):
    tot_destroyed_pub = models.BigIntegerField(blank=True, null=True)
    tot_destroyed_pvt = models.BigIntegerField(blank=True, null=True)
    part_damaged_pub = models.BigIntegerField(blank=True, null=True)
    part_damaged_pvt = models.BigIntegerField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)
    tot_dmg_pub = models.FloatField(blank=True, null=True)
    tot_dmg_pvt = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'transport_air\".\"dl_air_dmg_supplies'


class DlAirDmgOthers(models.Model):
    tot_destroyed = models.BigIntegerField(blank=True, null=True)
    part_damaged = models.BigIntegerField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    tot_dmg_pub = models.FloatField(blank=True, null=True)
    assets = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'transport_air\".\"dl_air_dmg_others'


# class DlAirDmgGstructures(models.Model):
#     tdest_floor_1 = models.BigIntegerField(blank=True, null=True)
#     tdest_floor_2_3 = models.BigIntegerField(blank=True, null=True)
#     tdest_floor_than_3 = models.BigIntegerField(blank=True, null=True)
#     pdmg_number = models.BigIntegerField(blank=True, null=True)
#     pdmg_roof = models.BigIntegerField(blank=True, null=True)
#     pdmg_wall = models.BigIntegerField(blank=True, null=True)
#     pdmg_floor = models.BigIntegerField(blank=True, null=True)
#     tot_pub = models.BigIntegerField(blank=True, null=True)
#     created_user = models.IntegerField(blank=True, null=True)
#     district = models.ForeignKey(District, db_column='district', blank=True, null=True)
#     lmu = models.IntegerField(blank=True, null=True)
#     lmd = models.DateTimeField(blank=True, null=True)
#     incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
#     created_date = models.DateTimeField(blank=True, null=True)
#     assets = models.CharField(max_length=-1, blank=True, null=True)
#
#     class Meta:
#         managed = False
#         db_table = 'transport_air\".\"dl_air_dmg_gstructures'


class DlAirLosFi(models.Model):
    year_1_pub = models.FloatField(blank=True, null=True)
    year_1_pvt = models.FloatField(blank=True, null=True)
    year_2_pub = models.FloatField(blank=True, null=True)
    year_2_pvt = models.FloatField(blank=True, null=True)
    tot_los_pub = models.FloatField(blank=True, null=True)
    tot_los_pvt = models.FloatField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    type_los = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'transport_air\".\"dl_air_los_fi'


class DlAirLosHoc(models.Model):
    year_1_pub = models.FloatField(blank=True, null=True)
    year_1_pvt = models.FloatField(blank=True, null=True)
    year_2_pub = models.FloatField(blank=True, null=True)
    year_2_pvt = models.FloatField(blank=True, null=True)
    tot_los_pub = models.FloatField(blank=True, null=True)
    tot_los_pvt = models.FloatField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)
    type_los = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'transport_air\".\"dl_air_los_hoc'


class DlAirLosOther(models.Model):
    year_1_pub = models.FloatField(blank=True, null=True)
    year_1_pvt = models.FloatField(blank=True, null=True)
    year_2_pub = models.FloatField(blank=True, null=True)
    year_2_pvt = models.FloatField(blank=True, null=True)
    tot_los_pub = models.FloatField(blank=True, null=True)
    tot_los_pvt = models.FloatField(blank=True, null=True)
    created_user = models.IntegerField(blank=True, null=True)
    district = models.ForeignKey(District, db_column='district', blank=True, null=True)
    lmu = models.IntegerField(blank=True, null=True)
    lmd = models.DateTimeField(blank=True, null=True)
    incident = models.ForeignKey(IncidentReport, db_column='incident', blank=True, null=True)
    created_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'transport_air\".\"dl_air_los_other'














