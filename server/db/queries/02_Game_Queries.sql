---- most max wins and max losses in a group for a specific game ---

--- most losses in a group for a specific game ---
select games.name,
 players.name,
 count(CASE WHEN matches_players.is_winner THEN 1 END) as wins,
    (select count(*)) - count(CASE WHEN matches_players.is_winner THEN 1 END) as losses
from games
join groups on games.group_id = groups.id
join matches on games.id = matches.game_id
join matches_players on matches.id = matches_players.match_id
join players on matches_players.player_id = players.id
where groups.id = 1
and games.id = 2
group by games.name, players.name
order by losses desc
limit 1
;


-- most wins in a group for a specific game ---
select games.name,
 players.name,
 count(CASE WHEN matches_players.is_winner THEN 1 END) as wins,
    (select count(*)) - count(CASE WHEN matches_players.is_winner THEN 1 END) as losses
from games
join groups on games.group_id = groups.id
join matches on games.id = matches.game_id
join matches_players on matches.id = matches_players.match_id
join players on matches_players.player_id = players.id
where groups.id = 1
and games.id = 2
group by games.name, players.name
order by wins desc
limit 1
;


-- select games.name,
--  players.name,
--  count(matches_players.is_winner) as wins,
--     (select count(*)) - count(matches_players.is_winner) as losses
-- from games
-- join groups on games.group_id = groups.id
-- join matches on games.id = matches.game_id
-- join matches_players on matches.id = matches_players.match_id
-- join players on matches_players.player_id = players.id
-- where groups.id = 1
-- and games.name = 'Catan'
-- group by games.name, players.name
-- ;

--  Gives you group Id , game , player name and all wins and loses for per game
-- Good stats
SELECT gm.group_id, g.name AS game_name, p.id, p.name,
       COUNT(CASE WHEN mp.is_winner = TRUE THEN 1 END) AS total_wins,
       COUNT(CASE WHEN mp.is_winner = FALSE THEN 1 END) AS total_losses
FROM groups_matches gm
JOIN matches m ON m.id = gm.match_id
JOIN games g ON g.id = m.game_id
JOIN matches_players mp ON mp.match_id = m.id
JOIN players p ON p.id = mp.player_id
WHERE gm.group_id = <groupId>
GROUP BY gm.group_id, g.id, p.id, p.name
ORDER BY gm.group_id, g.id, total_wins DESC, total_losses DESC

--  

