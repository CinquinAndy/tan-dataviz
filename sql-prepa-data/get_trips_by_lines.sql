select s.stop_id,
       s.stop_name,
       s.stop_lon,
       s.stop_lat,
       r.route_short_name,
       r.route_color,
       r.route_text_color,
       t.direction_id,
       st.stop_sequence
from stops s
         join stop_times st on s.stop_id = st.stop_id
         join trips t on st.trip_id = t.trip_id
         join routes r on t.route_id = r.route_id
where r.route_short_name = '2'
group by s.stop_id, s.stop_name, r.route_short_name, t.direction_id, st.stop_sequence,
         s.stop_lon, s.stop_lat, r.route_color, r.route_text_color
order by t.direction_id, st.stop_sequence;